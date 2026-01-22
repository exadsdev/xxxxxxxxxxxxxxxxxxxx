// src/actions/appActions.js
"use server";

import connectDB, { Visitor, Setting } from "@/lib/models";

/* -------------------------
   helpers
------------------------- */
function s(v) {
  return typeof v === "string" ? v.trim() : "";
}

function normalizeUrl(v) {
  let x = s(v);
  if (!x) return "";
  if (x.endsWith("/")) x = x.slice(0, -1);
  return x;
}

function safeJsonParse(text, fallback) {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

/* -------------------------
   Settings (pack: {current, history[], updatedAt})
------------------------- */
async function getSettingPack(key) {
  await connectDB();
  const doc = await Setting.findOne({ key }).lean();
  if (!doc?.value) return { current: "", history: [], updatedAt: null };

  const pack = safeJsonParse(doc.value, null);
  if (pack && typeof pack === "object") {
    return {
      current: s(pack.current || ""),
      history: Array.isArray(pack.history)
        ? pack.history.map((x) => s(x)).filter(Boolean)
        : [],
      updatedAt: pack.updatedAt || null,
    };
  }

  // รองรับของเก่า (value เป็น string ตรง)
  const plain = s(doc.value);
  return { current: plain, history: plain ? [plain] : [], updatedAt: null };
}

async function saveSettingPack(key, nextValue, maxHistory = 12) {
  await connectDB();

  const value = s(nextValue);
  const old = await getSettingPack(key);

  const newHistory = [value, ...old.history.filter((x) => x !== value)]
    .filter(Boolean)
    .slice(0, maxHistory);

  const pack = {
    current: value,
    history: newHistory,
    updatedAt: new Date().toISOString(),
  };

  await Setting.updateOne(
    { key },
    { $set: { value: JSON.stringify(pack) } },
    { upsert: true }
  );

  return pack;
}

export async function getGoogleTagSettings() {
  return await getSettingPack("google_tag");
}

export async function getShopUrlSettings() {
  return await getSettingPack("shop_url");
}

/* ✅ สำคัญมาก: export ชื่อนี้ให้ตรงกับที่หน้า Item.jsx เรียก */
export async function getShopUrl() {
  const pack = await getShopUrlSettings();
  return s(pack?.current || "");
}

/* -------------------------
   Save actions (ใช้กับ React.useActionState)
------------------------- */
export async function saveGoogleTagState(prevState, formData) {
  const tag = formData?.get ? formData.get("tagCode") : "";
  const pack = await saveSettingPack("google_tag", s(tag), 12);
  return { ok: true, message: "Saved", ...pack };
}

export async function saveShopUrlState(prevState, formData) {
  const url = formData?.get ? formData.get("shopUrl") : "";
  const pack = await saveSettingPack("shop_url", normalizeUrl(url), 12);
  return { ok: true, message: "Saved", ...pack };
}

/* -------------------------
   Bot Detection - วิเคราะห์ User-Agent
------------------------- */
function detectBotSource(userAgent) {
  const ua = (userAgent || "").toLowerCase();

  // Google Bots
  if (ua.includes("googlebot") || ua.includes("google-inspectiontool") || ua.includes("adsbot-google")) {
    return { isBot: true, sourceName: "Google Bot" };
  }

  // Facebook
  if (ua.includes("facebookexternalhit") || ua.includes("facebookcatalog") || ua.includes("fb_iab")) {
    return { isBot: true, sourceName: "Facebook Bot" };
  }

  // Line
  if (ua.includes("line/") || ua.includes("linebot")) {
    return { isBot: true, sourceName: "Line Bot" };
  }

  // Twitter / X
  if (ua.includes("twitterbot") || ua.includes("twittercard")) {
    return { isBot: true, sourceName: "Twitter Bot" };
  }

  // TikTok
  if (ua.includes("tiktok") || ua.includes("bytespider") || ua.includes("bytedance")) {
    return { isBot: true, sourceName: "TikTok Bot" };
  }

  // Discord
  if (ua.includes("discordbot")) {
    return { isBot: true, sourceName: "Discord Bot" };
  }

  // Telegram
  if (ua.includes("telegrambot")) {
    return { isBot: true, sourceName: "Telegram Bot" };
  }

  // WhatsApp
  if (ua.includes("whatsapp")) {
    return { isBot: true, sourceName: "WhatsApp Bot" };
  }

  // SEO Tools
  if (ua.includes("ahrefsbot")) {
    return { isBot: true, sourceName: "Ahrefs Bot" };
  }
  if (ua.includes("semrushbot")) {
    return { isBot: true, sourceName: "SEMrush Bot" };
  }
  if (ua.includes("mj12bot")) {
    return { isBot: true, sourceName: "Majestic Bot" };
  }

  // Bing
  if (ua.includes("bingbot") || ua.includes("msnbot")) {
    return { isBot: true, sourceName: "Bing Bot" };
  }

  // Yahoo
  if (ua.includes("slurp")) {
    return { isBot: true, sourceName: "Yahoo Bot" };
  }

  // Baidu
  if (ua.includes("baiduspider")) {
    return { isBot: true, sourceName: "Baidu Bot" };
  }

  // Yandex
  if (ua.includes("yandexbot")) {
    return { isBot: true, sourceName: "Yandex Bot" };
  }

  // Apple
  if (ua.includes("applebot")) {
    return { isBot: true, sourceName: "Apple Bot" };
  }

  // LinkedIn
  if (ua.includes("linkedinbot")) {
    return { isBot: true, sourceName: "LinkedIn Bot" };
  }

  // Pinterest
  if (ua.includes("pinterest")) {
    return { isBot: true, sourceName: "Pinterest Bot" };
  }

  // Slack
  if (ua.includes("slackbot")) {
    return { isBot: true, sourceName: "Slack Bot" };
  }

  // Generic Bot Detection
  if (ua.includes("bot") || ua.includes("spider") || ua.includes("crawler") ||
    ua.includes("scraper") || ua.includes("curl") || ua.includes("wget") ||
    ua.includes("python-requests") || ua.includes("axios") || ua.includes("httpx")) {
    return { isBot: true, sourceName: "Other Bot" };
  }

  // Human
  return { isBot: false, sourceName: "Human" };
}

/* -------------------------
   Visitor tracking (กันซ้ำ 2 นาทีต่อ IP)
------------------------- */
export async function trackVisitor(payload) {
  await connectDB();

  const ip = s(payload?.ip);
  const userAgent = s(payload?.userAgent);
  const path = s(payload?.path);
  const referrer = s(payload?.referrer);

  // ตรวจสอบ Bot จาก User-Agent
  const { isBot, sourceName } = detectBotSource(userAgent);

  if (!ip) return { ok: true, skipped: true, reason: "missing_ip" };

  const twoMinAgo = new Date(Date.now() - 2 * 60 * 1000);

  const recent = await Visitor.findOne({
    ip,
    timestamp: { $gte: twoMinAgo },
  })
    .select({ _id: 1 })
    .lean();

  if (recent) return { ok: true, skipped: true, reason: "duplicate_within_2_min" };

  await Visitor.create({ ip, userAgent, isBot, sourceName, path, referrer });
  return { ok: true, skipped: false, sourceName };
}

export async function getVisitorLogs(limit = 500) {
  await connectDB();
  const rows = await Visitor.find({})
    .sort({ timestamp: -1 })
    .limit(Number(limit) || 500)
    .lean();
  return rows;
}

export async function deleteVisitorByIds(formData) {
  await connectDB();
  const raw = formData?.get ? formData.get("selectedIds") : "";
  const text = s(raw);
  const ids = text.split(",").map((x) => x.trim()).filter(Boolean);
  if (ids.length === 0) return { ok: true, deleted: 0 };
  const res = await Visitor.deleteMany({ _id: { $in: ids } });
  return { ok: true, deleted: res?.deletedCount || 0 };
}

// ลบ visitors ตามประเภท: "all" | "bots" | "humans"
export async function deleteVisitorsByType(type) {
  await connectDB();

  let query = {};
  if (type === "bots") {
    query = { isBot: true };
  } else if (type === "humans") {
    query = { isBot: false };
  }
  // type === "all" จะใช้ query = {} ลบทั้งหมด

  const res = await Visitor.deleteMany(query);
  return { ok: true, deleted: res?.deletedCount || 0, type };
}

export async function adminLogin(formData) {
  const { cookies } = await import("next/headers");

  const username = formData?.get ? s(formData.get("username")) : s(formData?.username);
  const password = formData?.get ? s(formData.get("password")) : s(formData?.password);

  const success = username === "admin" && password === "admin";

  if (success) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
    });
  }

  return { success };
}
