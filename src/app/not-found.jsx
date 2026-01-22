import Link from 'next/link';

const brandName =
  process.env.NEXT_PUBLIC_BRAND_NAME || 'PG Mobile V9';

export const metadata = {
  title: `ไม่พบหน้านี้ | ${brandName}`,
  description:
    'ไม่พบหน้าที่คุณต้องการบนเว็บไซต์ PG Mobile V9 กรุณาตรวจสอบลิงก์หรือกลับไปยังหน้าแรกเพื่อเลือกดูสินค้าอื่น ๆ'
};

export default function NotFound() {
  return (
    <section className="py-5 py-md-6 bg-light">
      <div className="container-md" style={{ maxWidth: 900 }}>
        <div className="card shadow-sm border-0">
          <div className="card-body p-4 p-md-5 text-center">
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{
                width: 90,
                height: 90,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle at 30% 30%, #ffc107, #dc3545)',
                color: '#fff',
                fontSize: 40,
                fontWeight: 'bold'
              }}
            >
              404
            </div>

            <h1 className="h3 mb-3">ไม่พบหน้าที่คุณต้องการ</h1>
            <p className="mb-3 text-muted">
              อาจเป็นเพราะลิงก์ถูกลบ เปลี่ยนที่อยู่ (URL) หรือพิมพ์ลิงก์ไม่ถูกต้อง  
              คุณยังสามารถกลับไปหน้าแรกหรือเลือกดูสินค้ารุ่น PG Mobile, PG Mobile V9, PG V9, PG ได้จากปุ่มด้านล่าง
            </p>

            <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
              <Link href="/" className="btn btn-primary">
                กลับไปหน้าแรก
              </Link>
              <a href="/#products" className="btn btn-outline-secondary">
                ดูสินค้าทั้งหมด
              </a>
            </div>

            <div className="text-start small bg-white border rounded-3 p-3">
              <h2 className="h6 mb-2">คำแนะนำ</h2>
              <ul className="mb-0 ps-3">
                <li>ตรวจสอบการสะกดลิงก์ (URL) ให้ถูกต้องอีกครั้ง</li>
                <li>ลองกลับไปยังหน้าแรก แล้วค้นหาด้วยช่องค้นหาสินค้าบนหน้า</li>
                <li>หากคิดว่าเป็นข้อผิดพลาดของระบบ สามารถติดต่อทีมงานได้จากหน้า&nbsp;
                  <a href="/contact">ติดต่อเรา</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
