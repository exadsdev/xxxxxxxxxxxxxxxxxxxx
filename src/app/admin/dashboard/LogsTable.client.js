// src/app/admin/dashboard/LogsTable.client.js
"use client";

import React, { useMemo, useState } from "react";
import { deleteVisitorByIds } from "@/actions/appActions";

function safe(v) {
  return v === null || v === undefined ? "" : String(v);
}

function hourFromTime(timeStr) {
  const t = safe(timeStr);
  const hh = t.split(":")[0].replace(/\D/g, "");
  const n = parseInt(hh || "0", 10);
  return Number.isFinite(n) ? n : 0;
}

// สีพื้นหลังอ่อนๆ ตามชั่วโมง (โทนจางๆ)
const hourColors = [
  "#fafafa", "#f5f5f5", "#fafaf9", "#f5f5f4", "#fafafa", "#f5f5f5", // 00-05 เทาอ่อน
  "#fefce8", "#fef9c3", "#fefce8", "#fef9c3", "#fefce8", "#fef9c3", // 06-11 เหลืองอ่อน
  "#f0f9ff", "#e0f2fe", "#f0f9ff", "#e0f2fe", "#f0f9ff", "#e0f2fe", // 12-17 ฟ้าอ่อน
  "#fdf4ff", "#fae8ff", "#fdf4ff", "#fae8ff", "#fdf4ff", "#fae8ff", // 18-23 ม่วงอ่อน
];

// สี badge ตาม sourceName
function getSourceBadgeStyle(sourceName) {
  const name = (sourceName || "").toLowerCase();

  if (name === "human") {
    return { backgroundColor: "#10b981", color: "white" };
  }
  if (name.includes("google")) {
    return { backgroundColor: "#4285f4", color: "white" };
  }
  if (name.includes("facebook")) {
    return { backgroundColor: "#1877f2", color: "white" };
  }
  if (name.includes("line")) {
    return { backgroundColor: "#00c300", color: "white" };
  }
  if (name.includes("twitter")) {
    return { backgroundColor: "#1da1f2", color: "white" };
  }
  if (name.includes("tiktok")) {
    return { backgroundColor: "#000000", color: "white" };
  }
  if (name.includes("discord")) {
    return { backgroundColor: "#5865f2", color: "white" };
  }
  if (name.includes("telegram")) {
    return { backgroundColor: "#0088cc", color: "white" };
  }
  if (name.includes("whatsapp")) {
    return { backgroundColor: "#25d366", color: "white" };
  }
  if (name.includes("bing")) {
    return { backgroundColor: "#008373", color: "white" };
  }
  if (name.includes("ahrefs")) {
    return { backgroundColor: "#ff6b35", color: "white" };
  }
  if (name.includes("semrush")) {
    return { backgroundColor: "#ff642d", color: "white" };
  }
  // Default bot color
  return { backgroundColor: "#ef4444", color: "white" };
}

export default function LogsTableClient({ logs }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(() => new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (logs || []).filter((l) => {
      if (!q) return true;
      const hay = [l.ip, l.referrer, l.date, l.time, l.sourceName].map((x) => safe(x).toLowerCase()).join(" ");
      return hay.includes(q);
    });
  }, [logs, query]);

  const shown = useMemo(() => filtered.slice(0, 400), [filtered]);
  const selectedCsv = useMemo(() => Array.from(selected).join(","), [selected]);

  function toggleOne(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAllShown() {
    setSelected((prev) => {
      const next = new Set(prev);
      const ids = shown.map((x) => x.id);
      const all = ids.length > 0 && ids.every((id) => next.has(id));
      if (all) ids.forEach((id) => next.delete(id));
      else ids.forEach((id) => next.add(id));
      return next;
    });
  }

  return (
    <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <div style={{ fontWeight: "bold", fontSize: "16px" }}>Visitor Logs</div>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหา IP / Source / Referrer..."
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
              minWidth: "200px"
            }}
          />
          <button onClick={toggleAllShown} style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            backgroundColor: "white",
            cursor: "pointer"
          }}>
            เลือกทั้งหมด
          </button>
          <form action={deleteVisitorByIds} style={{ display: "inline" }}>
            <input type="hidden" name="selectedIds" value={selectedCsv} readOnly />
            <button
              type="submit"
              disabled={selected.size === 0}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: selected.size === 0 ? "#e5e7eb" : "#ef4444",
                color: selected.size === 0 ? "#9ca3af" : "white",
                cursor: selected.size === 0 ? "not-allowed" : "pointer"
              }}
            >
              ลบที่เลือก ({selected.size})
            </button>
          </form>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f9fafb", borderBottom: "2px solid #e5e7eb" }}>
              <th style={{ padding: "12px 16px", textAlign: "center", width: "50px" }}>
                <input
                  type="checkbox"
                  checked={shown.length > 0 && shown.every((l) => selected.has(l.id))}
                  onChange={toggleAllShown}
                />
              </th>
              <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "600" }}>IP</th>
              <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "600" }}>วันที่</th>
              <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "600" }}>เวลา</th>
              <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "600" }}>Source</th>
              <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "600" }}>Referrer</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((l) => {
              const checked = selected.has(l.id);
              const h = hourFromTime(l.time);
              const rowBg = hourColors[h] || "#ffffff";
              const badgeStyle = getSourceBadgeStyle(l.sourceName);

              return (
                <tr
                  key={l.id}
                  style={{
                    backgroundColor: rowBg,
                    borderBottom: "1px solid #e5e7eb"
                  }}
                >
                  <td style={{ padding: "10px 16px", textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleOne(l.id)}
                    />
                  </td>
                  <td style={{ padding: "10px 16px", fontFamily: "monospace" }}>{l.ip}</td>
                  <td style={{ padding: "10px 16px", fontWeight: "600", color: "#1d4ed8" }}>{l.date}</td>
                  <td style={{ padding: "10px 16px", fontFamily: "monospace", color: "#dc2626", fontWeight: "bold" }}>{l.time}</td>
                  <td style={{ padding: "10px 16px" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      fontSize: "12px",
                      ...badgeStyle
                    }}>
                      {l.sourceName || "Human"}
                    </span>
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    {l.referrer ? (
                      <a
                        href={l.referrer}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#2563eb", textDecoration: "underline" }}
                      >
                        {l.referrer.length > 50 ? l.referrer.slice(0, 50) + "..." : l.referrer}
                      </a>
                    ) : (
                      <span style={{ color: "#9ca3af" }}>-</span>
                    )}
                  </td>
                </tr>
              );
            })}

            {shown.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: "40px", textAlign: "center", color: "#9ca3af" }}>
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>📭</div>
                  <div>ไม่พบข้อมูล visitor</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid #e5e7eb", fontSize: "12px", color: "#6b7280" }}>
        แสดง {shown.length} จาก {filtered.length} รายการ
      </div>
    </div>
  );
}
