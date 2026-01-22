// src/app/admin/page.js
'use client'
import { adminLogin } from "@/actions/appActions";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function AdminLogin() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);

    startTransition(async () => {
      const res = await adminLogin(formData);
      if (res.success) {
        router.push('/admin/dashboard');
      } else {
        setError("รหัสผิดครับพี่!");
      }
    });
  }

  return (
    <div className="flex h-screen justify-center items-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Admin Access</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center text-sm">
            {error}
          </div>
        )}
        <input name="username" placeholder="Username" className="border p-2 w-full mb-2" required />
        <input name="password" type="password" placeholder="Password" className="border p-2 w-full mb-4" required />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "กำลังเข้าสู่ระบบ..." : "Login"}
        </button>
      </form>
    </div>
  );
}