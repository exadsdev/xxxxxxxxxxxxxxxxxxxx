// src/lib/models.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment variables.");
}

// ✅ ใช้ global cache กันเชื่อมซ้ำใน dev/hot-reload
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// 1) Visitor logs - พร้อมระบุประเภท Bot
const visitorSchema = new mongoose.Schema(
  {
    ip: { type: String, index: true },
    userAgent: String,
    isBot: Boolean,
    sourceName: { type: String, default: "Human" }, // ชื่อแหล่งที่มา: Human, Google Bot, Facebook Bot, etc.
    path: String,
    referrer: String,
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { versionKey: false }
);

// Index สำหรับ query ตาม sourceName
visitorSchema.index({ sourceName: 1 });

// 2) Settings (เก็บเป็น JSON string: { current, history[], updatedAt })
const settingSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, index: true },
    value: String,
  },
  { versionKey: false }
);

export const Visitor =
  mongoose.models.Visitor || mongoose.model("Visitor", visitorSchema);

export const Setting =
  mongoose.models.Setting || mongoose.model("Setting", settingSchema);
