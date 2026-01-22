'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'เกิดข้อผิดพลาด');
      }

      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">ชื่อ – นามสกุล</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">อีเมล</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">เบอร์โทรศัพท์</label>
        <input
          type="tel"
          className="form-control"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">ข้อความ</label>
        <textarea
          className="form-control"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'กำลังส่ง...' : 'ส่งข้อความ'}
      </button>

      {status === 'success' && (
        <p className="mt-2 text-success">ส่งข้อความเรียบร้อยแล้ว</p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-danger">
          เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง
        </p>
      )}
    </form>
  );
}
