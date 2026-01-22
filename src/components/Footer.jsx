import Link from 'next/link';

const brandName =
  process.env.NEXT_PUBLIC_BRAND_NAME || 'Your Brand';
const companyLegal =
  process.env.NEXT_PUBLIC_COMPANY_LEGAL ||
  'Your Company Legal Name';
const companyAddress =
  process.env.NEXT_PUBLIC_COMPANY_ADDRESS ||
  '183 หมู่ที่ 1 ตำบลคำตากล้า อำเภอคำตากล้า จังหวัดสกลนคร 47250';
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@example.com';
const contactPhone =
  process.env.NEXT_PUBLIC_CONTACT_PHONE || '000-000-0000';

const mapEmbed =
  process.env.NEXT_PUBLIC_CONTACT_MAP_EMBED || '';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-5 pb-3 border-top bg-light mt-4">
      <div className="container-md">
        <div className="row gy-4">

          {/* ข้อมูลร้านค้า */}
          <div className="col-md-4">
            <h5 className="mb-2">{brandName}</h5>
            <p className="small mb-1 fw-bold">{companyLegal}</p>
            <p className="small mb-1">{companyAddress}</p>
            <p className="small mb-1">โทร: {contactPhone}</p>
            <p className="small mb-2">
              อีเมล:{' '}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </p>

            <p className="small text-muted">
              
            </p>
          </div>

          {/* เมนูเว็บไซต์ */}
          <div className="col-md-4">
            <h6 className="mb-2">เมนูเว็บไซต์</h6>
            <ul className="list-unstyled small mb-0">
              <li className="mb-1"><Link href="/">หน้าแรก</Link></li>
              <li className="mb-1"><a href="/#products">สินค้า</a></li>
              <li className="mb-1"><Link href="/about">เกี่ยวกับเรา</Link></li>
              <li className="mb-1"><a href="/#faq">คำถามที่พบบ่อย (FAQ)</a></li>
              <li className="mb-1"><Link href="/contact">ติดต่อเรา</Link></li>
              <li className="mb-1"><Link href="/cart">ตะกร้าสินค้า</Link></li>
            </ul>

            <h6 className="mt-4 mb-2">นโยบายสำคัญ</h6>
            <ul className="list-unstyled small">
              <li><Link href="/privacy">นโยบายความเป็นส่วนตัว</Link></li>
              <li><Link href="/terms">เงื่อนไขการใช้งาน</Link></li>
              <li><Link href="/refund-policy">นโยบายการคืนสินค้า / รับประกัน</Link></li>
              <li><Link href="/security">นโยบายความปลอดภัยข้อมูล</Link></li>
            </ul>
          </div>

          {/* แผนที่ร้านค้า */}
          <div className="col-md-4">
            <h6 className="mb-2">PG MOBILE LIMITED PARTNERSHIP</h6>
        <p>183 หมู่ที่ 1 ต.คำตากล้า อ.คำตากล้า จ.สกลนคร 47250</p>
            {mapEmbed ? (
              <div className="ratio ratio-4x3 rounded overflow-hidden shadow-sm">
                <iframe
                  src={mapEmbed}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            ) : (
              <p className="small text-muted">
                * ยังไม่ได้ตั้งค่าแผนที่ในไฟล์ .env.local
              </p>
            )}

            <p className="mt-2 small text-muted">
             
            </p>
          </div>

        </div>

        <hr className="mt-4 mb-3" />

        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <p className="small text-muted mb-0">
            © {year} {companyLegal}. สงวนลิขสิทธิ์.
          </p>

          
        </div>
      </div>
    </footer>
  );
}
