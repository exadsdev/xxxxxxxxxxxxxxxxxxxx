import Link from 'next/link';

const brandName =
  process.env.NEXT_PUBLIC_BRAND_NAME || 'Your Brand';
const companyLegal =
  process.env.NEXT_PUBLIC_COMPANY_LEGAL ||
  'Your Company Legal Name';
const contactPhone =
  process.env.NEXT_PUBLIC_CONTACT_PHONE || '000-000-0000';
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@example.com';

export const metadata = {
  title: `ขอบคุณสำหรับการสั่งซื้อ | ${brandName}`,
  description:
    'ยืนยันรับคำสั่งซื้อเรียบร้อยแล้ว ทีมงานจะติดต่อกลับเพื่อยืนยันข้อมูลและจัดส่งสินค้าตามขั้นตอนต่อไป'
};

export default function ThankYouPage() {
  return (
    <section className="py-5 bg-light">
      <div className="container" style={{ maxWidth: 800 }}>
        <div className="card shadow-sm border-0">
          <div className="card-body p-4 p-md-5 text-center">
            <div
              className="mb-3 mx-auto d-flex align-items-center justify-content-center"
              style={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, #198754, #0d6efd)',
                color: '#fff',
                fontSize: 34
              }}
            >
              ✓
            </div>
            <h1 className="h3 mb-3">ขอบคุณสำหรับการสั่งซื้อ</h1>
            <p className="lead mb-4">
              ระบบได้รับคำสั่งซื้อของคุณเรียบร้อยแล้ว
              ทีมงานของเราจะตรวจสอบข้อมูลและติดต่อกลับเพื่อยืนยันการจัดส่ง
              และเก็บเงินปลายทางตามรายละเอียดที่คุณให้ไว้
            </p>

            <div className="row text-start mb-4">
              <div className="col-md-6 mb-3">
                <h2 className="h6">ขั้นตอนต่อจากนี้</h2>
                <ul className="small mb-0">
                  <li>
                    ทีมงานอาจโทรติดต่อไปยังเบอร์ที่คุณระบุ
                    เพื่อยืนยันคำสั่งซื้อและที่อยู่จัดส่ง
                  </li>
                  <li>
                    เมื่อจัดส่งแล้ว คุณจะได้รับการแจ้งเตือนจากบริษัทขนส่ง
                    พร้อมเลข Tracking เพื่อตรวจสอบสถานะพัสดุ
                  </li>
                  <li>
                    กรุณาเตรียมเงินสดให้พร้อมในวันที่พนักงานจัดส่งไปถึงปลายทาง
                    ตามยอดที่แจ้งไว้ในคำสั่งซื้อ
                  </li>
                </ul>
              </div>
              <div className="col-md-6 mb-3">
                <h2 className="h6">ข้อมูลการจัดส่งโดยสรุป</h2>
                <ul className="small mb-0">
                  <li>จัดส่งด้วยขนส่งเอกชนที่มีเลข Tracking</li>
                  <li>ระยะเวลาจัดส่งโดยประมาณ 1–3 วันทำการ</li>
                  <li>บริการจัดส่งฟรีแบบเก็บเงินปลายทางทั่วประเทศ</li>
                  <li>
                    หากพบปัญหาเรื่องสินค้า/การจัดส่ง
                    สามารถติดต่อทีมงานได้ทันที
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-4 text-start small bg-white rounded-3 p-3 border">
              <h2 className="h6 mb-2">ติดต่อร้านค้า</h2>
              <p className="mb-1 fw-bold">{companyLegal}</p>
              <p className="mb-1">โทร: {contactPhone}</p>
              <p className="mb-0">
                อีเมล:{' '}
                <a href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
              </p>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-2">
              <Link href="/" className="btn btn-primary">
                กลับไปหน้าแรก
              </Link>
              <Link
                href="/#products"
                className="btn btn-outline-secondary"
              >
                ดูสินค้าอื่นเพิ่มเติม
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
