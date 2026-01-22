import CommercialRegistration from "@/components/CommercialRegistration";


const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "PG Mobile V9";
const companyLegal =
  process.env.NEXT_PUBLIC_COMPANY_LEGAL ||
  "PG MOBILE LIMITED PARTNERSHIP";
const companyAddress =
  process.env.NEXT_PUBLIC_COMPANY_ADDRESS ||
  "183 หมู่ที่ 1 ตำบลคำตากล้า อำเภอคำตากล้า จังหวัดสกลนคร 47250";
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@example.com";
const contactPhone =
  process.env.NEXT_PUBLIC_CONTACT_PHONE || "000-000-0000";

export const metadata = {
  title: `นโยบายความเป็นส่วนตัว | ${brandName}`,
  description: `นโยบายความเป็นส่วนตัวของ ${brandName} — การเก็บ ใช้ และเปิดเผยข้อมูลส่วนบุคคลเมื่อคุณใช้งานเว็บไซต์และสั่งซื้อสินค้า`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true }
};

export default function PrivacyPage() {
  return (
    <section className="py-4 py-md-5">
      <div className="container" style={{ maxWidth: 900 }}>
        <h1 className="mb-3">นโยบายความเป็นส่วนตัว</h1>

        <p className="mb-2">
          <strong>มีผลบังคับใช้:</strong> 1 ธันวาคม 2025
          <br />
          <strong>อัปเดตล่าสุด:</strong> 1 ธันวาคม 2025
        </p>

        <p className="mb-0">
          นโยบายฉบับนี้อธิบายว่า {brandName} (ดำเนินการโดย{" "}
          <strong>{companyLegal}</strong>) เก็บรวบรวม ใช้ เปิดเผย และปกป้อง
          “ข้อมูลส่วนบุคคล” ของคุณอย่างไร เมื่อคุณเข้าชมเว็บไซต์ ติดต่อสอบถาม
          หรือสั่งซื้อสินค้าผ่านหน้าเว็บไซต์นี้
        </p>

        <h2 className="mt-4">1) ผู้ควบคุมข้อมูลและช่องทางติดต่อ</h2>
        <p className="mb-2">
          <strong>{companyLegal}</strong>
          <br />
          ที่อยู่: {companyAddress}
          <br />
          โทร: {contactPhone}
          <br />
          อีเมล: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>

        <h2 className="mt-4">2) ข้อมูลที่เราเก็บรวบรวม</h2>
        <p className="mb-2">
          เราเก็บข้อมูลเท่าที่จำเป็นต่อการขาย การจัดส่ง การบริการหลังการขาย
          และการป้องกันการทุจริต โดยข้อมูลที่อาจถูกเก็บรวบรวมมีดังนี้
        </p>
        <ul>
          <li>
            <strong>ข้อมูลคำสั่งซื้อ/จัดส่ง:</strong> ชื่อ–นามสกุล, เบอร์โทร,
            ที่อยู่จัดส่ง, จังหวัด/อำเภอ/รหัสไปรษณีย์ (ถ้ามีการกรอก),
            รายการสินค้า, จำนวน, ยอดรวม, วิธีชำระเงินแบบเก็บเงินปลายทาง (COD)
          </li>
          <li>
            <strong>ข้อมูลการติดต่อ:</strong> ชื่อ, อีเมล, เบอร์โทร และข้อความที่คุณส่งถึงเรา
          </li>
          <li>
            <strong>ข้อมูลการใช้งานและข้อมูลอุปกรณ์:</strong> ข้อมูลบันทึกการใช้งาน,
            ที่อยู่ IP, ประเภทเบราว์เซอร์/อุปกรณ์ เพื่อความปลอดภัยและการปรับปรุงระบบ
          </li>
          <li>
            <strong>คุกกี้และเทคโนโลยีที่คล้ายกัน:</strong> ใช้เพื่อให้เว็บไซต์ทำงานได้อย่างถูกต้อง
            เช่น การจดจำตะกร้าสินค้า และการบันทึกสถานะการยินยอม
          </li>
        </ul>

        <h2 className="mt-4">3) วัตถุประสงค์และฐานทางกฎหมาย</h2>
        <ul>
          <li>
            <strong>ดำเนินการตามคำสั่งซื้อ:</strong> รับออเดอร์ ยืนยันข้อมูล และจัดส่งสินค้า
            (ฐานสัญญา)
          </li>
          <li>
            <strong>บริการลูกค้า:</strong> ตอบคำถาม ติดตามสถานะ และบริการหลังการขาย
            (ฐานสัญญา/ประโยชน์โดยชอบ)
          </li>
          <li>
            <strong>ความปลอดภัย:</strong> ป้องกันสแปม การทุจริต และการโจมตีระบบ
            (ฐานประโยชน์โดยชอบ)
          </li>
          <li>
            <strong>การโฆษณาและวัดผล:</strong> เมื่อมีการเปิดใช้งาน Google Ads หรือเครื่องมือวิเคราะห์
            (ฐานความยินยอมสำหรับคุกกี้ที่ไม่จำเป็น)
          </li>
        </ul>

        <h2 className="mt-4">4) การเปิดเผยข้อมูล</h2>
        <ul>
          <li>บริษัทขนส่ง เพื่อจัดส่งสินค้าและติดต่อผู้รับ</li>
          <li>ผู้ให้บริการโฮสติ้งและโครงสร้างพื้นฐาน</li>
          <li>ผู้ให้บริการด้านโฆษณา/วัดผล เช่น Google (เมื่อมีการเปิดใช้งาน)</li>
        </ul>

        <h2 className="mt-4">5) การโอนข้อมูลไปต่างประเทศ</h2>
        <p>
          กรณีใช้บริการของผู้ให้บริการเทคโนโลยีจากต่างประเทศ
          ข้อมูลอาจถูกประมวลผลบนเซิร์ฟเวอร์ในต่างประเทศ โดยเราจะดำเนินการเท่าที่จำเป็น
          และสอดคล้องกับกฎหมายที่เกี่ยวข้อง
        </p>

        <h2 className="mt-4">6) ระยะเวลาการเก็บรักษาข้อมูล</h2>
        <ul>
          <li>ข้อมูลติดต่อ: ไม่เกิน 24 เดือน</li>
          <li>ข้อมูลคำสั่งซื้อ: ตามความจำเป็นด้านการจัดส่ง บริการหลังการขาย และกฎหมาย</li>
          <li>ข้อมูลเทคนิค: ตามความจำเป็นเพื่อความปลอดภัยของระบบ</li>
        </ul>

        <h2 className="mt-4">7) สิทธิของเจ้าของข้อมูล</h2>
        <p>
          คุณมีสิทธิขอเข้าถึง แก้ไข ลบ ระงับการใช้ คัดค้านการประมวลผล
          และถอนความยินยอม (ในกรณีที่อาศัยความยินยอม)
        </p>

        <h2 className="mt-4">8) มาตรการความปลอดภัย</h2>
        <p>
          เราใช้มาตรการทางเทคนิคและการจัดการที่เหมาะสม
          เพื่อป้องกันการเข้าถึง ใช้ หรือเปิดเผยข้อมูลโดยไม่ได้รับอนุญาต
        </p>

        <h2 className="mt-4">9) การเปลี่ยนแปลงนโยบาย</h2>
        <p>
          หากมีการเปลี่ยนแปลงสาระสำคัญ เราจะประกาศนโยบายฉบับใหม่บนหน้านี้
          พร้อมระบุวันที่อัปเดต
        </p>
          <h2 className="mt-4">10) ติดต่อเรา</h2>
        <p className="mb-3">
          <strong>{companyLegal}</strong>
          <br />
          ที่อยู่: {companyAddress}
          <br />
          โทร: {contactPhone}
          <br />
          อีเมล: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
   <CommercialRegistration />

      </div>
    </section>
  );
}
