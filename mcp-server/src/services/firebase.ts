
import admin from "firebase-admin";

export class FirebaseService {
  private db: admin.firestore.Firestore | null = null;

  constructor() {
    // Only initialize if we haven't already
    if (!admin.apps.length) {
      try {
        // Assumes GOOGLE_APPLICATION_CREDENTIALS env var is set
        // OR process.env.FIREBASE_SERVICE_ACCOUNT is the raw JSON
        if (process.env.FIREBASE_SERVICE_ACCOUNT) {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        } else {
            console.warn("FIREBASE_SERVICE_ACCOUNT env not set. Firebase tools will fail.");
            return;
        }
        this.db = admin.firestore();
      } catch (e) {
        console.error("Failed to init Firebase:", e);
      }
    } else {
        this.db = admin.firestore();
    }
  }

  async getBookings(limit: number = 10, status?: string) {
    if (!this.db) throw new Error("Firebase not initialized");

    try {
      let query = this.db.collection("bookings").limit(limit);
      
      if (status) {
        query = query.where("status", "==", status);
      }

      const snapshot = await query.get();
      const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      return {
        content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      };
    } catch (error: any) {
      throw new Error(`Firebase Error: ${error.message}`);
    }
  }
}
