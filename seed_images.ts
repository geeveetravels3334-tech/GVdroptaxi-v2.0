import { DETAILED_VEHICLES } from './constants.tsx';
import { db } from './services/firebase.ts';
import { doc, updateDoc, getDocs, collection } from 'firebase/firestore';

async function updateImages() {
  try {
    const q = collection(db, 'vehicles');
    const snapshot = await getDocs(q);
    for (const d of snapshot.docs) {
      const v = DETAILED_VEHICLES.find(x => x.id === d.id);
      if (v) {
        await updateDoc(doc(db, 'vehicles', d.id), { image: v.image });
        console.log(`Updated ${d.id}`);
      }
    }
  } catch(e) {
    console.error(e);
  }
}
updateImages();
