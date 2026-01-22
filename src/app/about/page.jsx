import CommercialRegistration from "@/components/CommercialRegistration";


const brandName =
  process.env.NEXT_PUBLIC_BRAND_NAME || 'Your Brand';
const companyLegal =
  process.env.NEXT_PUBLIC_COMPANY_LEGAL || 'Your Company Legal Name';
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@example.com';
const contactPhone =
  process.env.NEXT_PUBLIC_CONTACT_PHONE || '000-000-0000';
const companyAddress =
  process.env.NEXT_PUBLIC_COMPANY_ADDRESS ||
  '183 หมู่ที่ 1 ตำบลคำตากล้า อำเภอคำตากล้า จังหวัดสกลนคร 47250';

export const metadata = {
  title: `เกี่ยวกับเรา | ${brandName}`,
  description: `เกี่ยวกับร้าน ${brandName} และบริษัท ${companyLegal}`
};

export default function AboutPage() {
  return (
    <section className="py-4 py-md-5">
      <div className="container" style={{ maxWidth: 900 }}>
        <h1 className="mb-3">เกี่ยวกับเรา</h1>
        <p className="lead mb-4">
          {brandName} คือร้านขายโทรศัพท์มือถือออนไลน์ที่มุ่งเน้นให้ลูกค้า
          ได้รับสินค้าของแท้ มีประกันศูนย์ไทย ในราคาที่คุ้มค่า
          และบริการหลังการขายที่จริงใจ
        </p>

        <h2 className="h5 mt-4 mb-2">ข้อมูลบริษัท</h2>
        <p className="mb-2">
          <strong>{companyLegal}</strong>
          <br />
          {companyAddress}
        </p>

        <h2 className="h5 mt-4 mb-2">วิสัยทัศน์</h2>
        <p>
          เราต้องการเป็นตัวเลือกแรกของลูกค้าที่มองหามือถือคุณภาพดี
          พร้อมบริการซื่อสัตย์ โปร่งใส และเข้าใจผู้ใช้งานจริง
        </p>

        <h2 className="h5 mt-4 mb-2">สิ่งที่เราให้ความสำคัญ</h2>
        <ul>
          <li>ความน่าเชื่อถือของสินค้าและแหล่งจัดจำหน่าย</li>
          <li>ความคุ้มค่าในด้านราคาและโปรโมชั่น</li>
          <li>บริการหลังการขายและการรับประกันที่ชัดเจน</li>
          <li>การให้ข้อมูลที่ถูกต้องและตรงไปตรงมา</li>
        </ul>

        <h2 className="h5 mt-4 mb-2">ติดต่อเรา</h2>
        <p className="mb-1">โทร: {contactPhone}</p>
        <p className="mb-1">
          อีเมล:{' '}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
        <p>
          หรือดูข้อมูลเพิ่มเติมได้ที่หน้า{' '}
          <a href="/contact">ติดต่อเรา</a>
        </p>
   <CommercialRegistration />

      </div>
    </section>
  );
}
