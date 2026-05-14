
    import express from "express";
    import { config } from "dotenv";
    import compression from "compression";
    import cookieParser from "cookie-parser";
    import Db from "./src/config/Db.js";
    import cors from "cors";
    import morgan from "morgan";
    import helmet from "helmet";
    import cluster from "cluster";
    import os from "os";
    import authRoutes from "./src/routes/authRoutes.js";
    import vendorRoutes from "./src/routes/vendorRoutes.js";
    import inquiryRoutes from "./src/routes/inquiryRoutes.js";
    import bookingRoutes from "./src/routes/bookingRoutes.js";
    import paymentRoutes from "./src/routes/paymentRoutes.js";
    import adminRoutes from "./src/routes/adminRoutes.js";
    import notificationRoutes from "./src/routes/notificationRoutes.js";
    import reportRoutes from "./src/routes/reportRoutes.js";

    config();

    const PORT = process.env.PORT || 5000;
    const numCPUs = os.cpus().length;

    if (cluster.isPrimary) {
      console.log("Master process running:", process.pid);

      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on("exit", (worker) => {
        console.log("Worker died:", worker.process.pid);
        cluster.fork();
      });

    } else {

    const app = express();

    app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true }));
    app.use(helmet());
    
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(morgan("dev"));

    app.get("/", (req, res) => {
      res.send("ShaadiHub Backend is Running!");
    });

    app.use("/api/auth", authRoutes);
    app.use("/api/vendors", vendorRoutes);
    app.use("/api/inquiries", inquiryRoutes);
    app.use("/api/bookings", bookingRoutes);
    app.use("/api/payments", paymentRoutes);
    app.use("/api/admin", adminRoutes);
    app.use("/api/notifications", notificationRoutes);
    app.use("/api/reports", reportRoutes);

    Db().then(() => {
      app.listen(PORT, () =>
        console.log("🚀 Server running at http://localhost:" + PORT)
      );
    });

    }
    