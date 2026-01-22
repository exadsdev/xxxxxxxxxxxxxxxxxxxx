// src/app/admin/dashboard/page.js
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getVisitorLogs, getGoogleTagSettings, getShopUrlSettings } from "@/actions/appActions";
import SettingsPanelClient from "./SettingsPanel.client";
import LogsTableClient from "./LogsTable.client";

export const dynamic = "force-dynamic";

function toDate(input) {
  const d = input instanceof Date ? input : new Date(input);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatTH(input) {
  const d = toDate(input);
  if (!d) return { date: "-", time: "-" };

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const date = `${year}-${month}-${day}`;

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  const time = `${hours}:${minutes}:${seconds}`;

  return { date, time };
}

function normalize(log) {
  const t = formatTH(log?.timestamp);
  return {
    id: String(log?._id ?? ""),
    ip: String(log?.ip ?? "-"),
    path: String(log?.path ?? "-"),
    referrer: String(log?.referrer ?? ""),
    isBot: Boolean(log?.isBot),
    sourceName: String(log?.sourceName ?? "Human"),
    userAgent: String(log?.userAgent ?? "-"),
    date: t.date,
    time: t.time,
  };
}

export default async function Dashboard() {
  const cookieStore = await cookies();
  if (!cookieStore.get("admin_session")) redirect("/admin");

  const [rawLogs, googleSeed, shopSeed] = await Promise.all([
    getVisitorLogs(2000),
    getGoogleTagSettings(),
    getShopUrlSettings(),
  ]);

  const logs = Array.isArray(rawLogs) ? rawLogs.map(normalize) : [];

  const total = logs.length;
  const humans = logs.filter((l) => !l.isBot).length;
  const bots = logs.filter((l) => l.isBot).length;
  const clicks = 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#e8f4fc" }}>
      {/* Settings Panel - 2 boxes at top */}
      <div className="p-4">
        <SettingsPanelClient
          googleSeed={googleSeed}
          shopSeed={shopSeed}
          stats={{ total, humans, bots, clicks }}
        />
      </div>

      {/* Logs Table */}
      <div className="p-4 pt-0">
        <LogsTableClient logs={logs} />
      </div>
    </div>
  );
}
