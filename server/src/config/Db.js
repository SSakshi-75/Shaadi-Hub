
    import mongoose from "mongoose";

    const Db = async () => {
      try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("📡 Database Connected:", conn.connection.host);
      } catch (err) {
        console.log("❌ Database Error:", err.message);
      }
    };

    export default Db;
    