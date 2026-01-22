import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();

    // ตรงนี้คุณสามารถนำ data ไปบันทึกลงฐานข้อมูล / ส่งไลน์ / ส่งอีเมล ได้ในอนาคต
    // ตอนนี้ลอง log ดูใน server ก่อน
    console.log('📦 New COD order:', JSON.stringify(data, null, 2));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Order error:', err);
    return new NextResponse('Order error', { status: 500 });
  }
}
