import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { BookingService } from "./services/booking.ts";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Driver Routes
  app.get("/api/drivers", async (req, res) => {
    try {
      const drivers = await BookingService.getDrivers();
      res.json(drivers);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/drivers", async (req, res) => {
    try {
      const driver = await BookingService.addDriver(req.body);
      res.json(driver);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/drivers/:id", async (req, res) => {
    try {
      const success = await BookingService.updateDriver({ ...req.body, id: req.params.id });
      res.json({ success });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/drivers/:id", async (req, res) => {
    try {
      await BookingService.deleteDriver(req.params.id);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Booking Routes
  app.post("/api/bookings", async (req, res) => {
    try {
      console.log("SERVER RECEIVED BOOKING REQUEST:", req.body);
      const result = await BookingService.saveBooking(req.body);
      console.log("SERVER BOOKING SAVED SUCCESS:", result);
      res.json(result);
    } catch (err: any) {
      console.error("SERVER BOOKING ERROR:", err);
      res.status(500).json({ error: err.message || "Failed to save booking" });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await BookingService.getAllBookings();
      res.json(bookings);
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to fetch bookings" });
    }
  });

  app.get("/api/bookings/user/:mobile", async (req, res) => {
    try {
      const bookings = await BookingService.getUserBookings(req.params.mobile);
      res.json(bookings);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const success = await BookingService.updateBookingStatus(req.params.id, req.body.status);
      res.json({ success });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/bookings/:id/assign", async (req, res) => {
    try {
      const success = await BookingService.assignDriver(req.params.id, req.body.driver);
      res.json({ success });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.patch("/api/bookings/:id/share", async (req, res) => {
    try {
      const { target } = req.body;
      const success = await BookingService.markTripShared(req.params.id, target);
      res.json({ success });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/bookings/:id", async (req, res) => {
    try {
      await BookingService.deleteBooking(req.params.id);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await BookingService.getStats();
      res.json(stats);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
