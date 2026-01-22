// src/app/admin/dashboard/SettingsPanel.client.js
"use client";

import React, { useState, useTransition } from "react";
import { saveGoogleTagState, saveShopUrlState, deleteVisitorsByType } from "@/actions/appActions";
import { useRouter } from "next/navigation";

const initState = (seed) => ({
  ok: false,
  message: "",
  current: seed?.current || "",
  history: Array.isArray(seed?.history) ? seed.history : [],
  updatedAt: seed?.updatedAt || null,
});

export default function SettingsPanelClient({ googleSeed, shopSeed, stats }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deletingType, setDeletingType] = useState(null);

  const [googleState, googleAction] = React.useActionState(
    saveGoogleTagState,
    initState(googleSeed)
  );
  const [shopState, shopAction] = React.useActionState(
    saveShopUrlState,
    initState(shopSeed)
  );

  const { total = 0, bots = 0, clicks = 0, humans = 0 } = stats || {};

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  };

  const labelStyle = {
    fontSize: "12px",
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: "8px",
    display: "block"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    marginBottom: "10px"
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3b82f6",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%"
  };

  const statCardStyle = {
    ...cardStyle,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  };

  const deleteBtnStyle = {
    padding: "8px 20px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#ef4444",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "13px"
  };

  async function handleDelete(type) {
    const typeNames = {
      all: "ผู้เข้าชมทั้งหมด",
      humans: "คนคลิก (Humans)",
      bots: "Bot ทั้งหมด"
    };

    const confirmMsg = `คุณต้องการลบ ${typeNames[type]} หรือไม่?\n\nการดำเนินการนี้ไม่สามารถย้อนกลับได้!`;

    if (confirm(confirmMsg)) {
      setDeletingType(type);

      startTransition(async () => {
        try {
          const result = await deleteVisitorsByType(type);
          alert(`ลบสำเร็จ! จำนวนที่ลบ: ${result.deleted} รายการ`);
          router.refresh(); // รีโหลดข้อมูลใหม่
        } catch (error) {
          alert("เกิดข้อผิดพลาด: " + error.message);
        } finally {
          setDeletingType(null);
        }
      });
    }
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "16px"
    }}>
      {/* กล่อง 1: Input Google Track + URL */}
      <div style={cardStyle}>
        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Google Track ID</label>
          <form action={googleAction}>
            <input
              type="text"
              name="tagCode"
              defaultValue={googleSeed?.current || ""}
              placeholder="AW-123456789"
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>
              บันทึก
            </button>
          </form>
        </div>

        <div>
          <label style={labelStyle}>Shop URL</label>
          <form action={shopAction}>
            <input
              type="url"
              name="shopUrl"
              defaultValue={shopSeed?.current || ""}
              placeholder="https://example.com"
              style={inputStyle}
            />
            <button type="submit" style={{ ...buttonStyle, backgroundColor: "#10b981" }}>
              บันทึก
            </button>
          </form>
        </div>
      </div>

      {/* กล่อง 2: จำนวนคนเข้า */}
      <div style={statCardStyle}>
        <div style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "#dbeafe",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px"
        }}>
          <span style={{ fontSize: "20px" }}>👥</span>
        </div>
        <div style={{ fontSize: "28px", fontWeight: "bold", color: "#1e40af" }}>
          {total.toLocaleString()}
        </div>
        <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px", marginBottom: "12px" }}>
          จำนวนคนเข้า
        </div>
        <button
          type="button"
          style={{
            ...deleteBtnStyle,
            opacity: (isPending && deletingType === 'all') ? 0.7 : 1,
            cursor: isPending ? 'wait' : 'pointer'
          }}
          onClick={() => handleDelete('all')}
          disabled={isPending}
        >
          {(isPending && deletingType === 'all') ? 'กำลังลบ...' : 'ลบทั้งหมด'}
        </button>
      </div>

      {/* กล่อง 3: จำนวนคนคลิก (Humans) */}
      <div style={statCardStyle}>
        <div style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "#fef3c7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px"
        }}>
          <span style={{ fontSize: "20px" }}>👆</span>
        </div>
        <div style={{ fontSize: "28px", fontWeight: "bold", color: "#b45309" }}>
          {humans.toLocaleString()}
        </div>
        <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px", marginBottom: "12px" }}>
          จำนวนคนคลิก
        </div>
        <button
          type="button"
          style={{
            ...deleteBtnStyle,
            backgroundColor: "#f59e0b",
            opacity: (isPending && deletingType === 'humans') ? 0.7 : 1,
            cursor: isPending ? 'wait' : 'pointer'
          }}
          onClick={() => handleDelete('humans')}
          disabled={isPending}
        >
          {(isPending && deletingType === 'humans') ? 'กำลังลบ...' : 'ลบ Humans'}
        </button>
      </div>

      {/* กล่อง 4: จำนวน Bot */}
      <div style={statCardStyle}>
        <div style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "#fee2e2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px"
        }}>
          <span style={{ fontSize: "20px" }}>🤖</span>
        </div>
        <div style={{ fontSize: "28px", fontWeight: "bold", color: "#dc2626" }}>
          {bots.toLocaleString()}
        </div>
        <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px", marginBottom: "12px" }}>
          จำนวน Bot
        </div>
        <button
          type="button"
          style={{
            ...deleteBtnStyle,
            opacity: (isPending && deletingType === 'bots') ? 0.7 : 1,
            cursor: isPending ? 'wait' : 'pointer'
          }}
          onClick={() => handleDelete('bots')}
          disabled={isPending}
        >
          {(isPending && deletingType === 'bots') ? 'กำลังลบ...' : 'ลบ Bot'}
        </button>
      </div>
    </div>
  );
}
