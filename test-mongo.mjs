import { MongoClient } from "mongodb";

process.loadEnvFile(".env");
const uri = process.env.MONGODB_URI || "";

try {
  const u = new URL(uri);
  console.log("scheme  :", u.protocol);
  console.log("username:", decodeURIComponent(u.username));
  console.log("pass len:", decodeURIComponent(u.password).length);
  console.log("host    :", u.host);
  console.log("has quotes/spaces:", /["'\s]/.test(uri));
} catch {
  console.log("❌ MONGODB_URI পার্স হচ্ছে না। ফাঁকা বা ভুল ফরম্যাট।");
}

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("✅ MongoDB connected");
} catch (e) {
  console.log("❌ Failed:", e.message);
} finally {
  await client.close();
}