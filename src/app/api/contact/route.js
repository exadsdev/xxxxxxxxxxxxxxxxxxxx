// app/api/contact/route.js
import { NextResponse } from 'next/server';

// โค้ดนี้เป็นตัวอย่างจำลองการรับข้อมูลจากฟอร์มอย่างปลอดภัย
// ถ้าต้องการส่งอีเมลจริง ให้ไปต่อยอดใช้ SMTP / Service ภายนอก เช่น SendGrid, Resend ฯลฯ

export async function POST(request) {
  try {
    const body = await request.json();

    const name = (body.name || '').toString().trim();
    const email = (body.email || '').toString().trim();
    const phone = (body.phone || '').toString().trim();
    const message = (body.message || '').toString().trim();

    if (!name || !email || !message) {
      return new NextResponse('กรุณากรอกชื่อ อีเมล และข้อความให้ครบถ้วน', {
        status: 400
      });
    }

    // TODO: เพิ่มการส่งอีเมลจริงที่นี่

    console.log('New contact message from PG Mobile V9:', {
      name,
      email,
      phone,
      message
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return new NextResponse('เกิดข้อผิดพลาด', { status: 500 });
  }
}
