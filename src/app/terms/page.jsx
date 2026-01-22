import Link from "next/link";
import Image from "next/image";
import CommercialRegistration from "@/components/CommercialRegistration";

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "PG Mobile V9";
const companyLegal =
  process.env.NEXT_PUBLIC_COMPANY_LEGAL || "PG MOBILE LIMITED PARTNERSHIP";
const companyAddress =
  process.env.NEXT_PUBLIC_COMPANY_ADDRESS ||
  "183 หมู่ที่ 1 ตำบลคำตากล้า อำเภอคำตากล้า จังหวัดสกลนคร 47250";
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@example.com";
const contactPhone =
  process.env.NEXT_PUBLIC_CONTACT_PHONE || "000-000-0000";

export const metadata = {
  title: `เงื่อนไขการใช้งาน | ${brandName}`,
  description: `เงื่อนไขการใช้งานเว็บไซต์และการสั่งซื้อสินค้าแบบเก็บเงินปลายทาง (COD) ของ ${brandName}`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true }
};

export default function TermsPage() {
  return (
    <section className="py-4 py-md-5">
      <div className="container" style={{ maxWidth: 900 }}>
        <h1 className="mb-3">เงื่อนไขการใช้งานเว็บไซต์ และเงื่อนไขการสั่งซื้อ</h1>

        <p className="mb-2">
          <strong>มีผลบังคับใช้:</strong> 1 ธันวาคม 2025
          <br />
          <strong>อัปเดตล่าสุด:</strong> 1 ธันวาคม 2025
        </p>

        <p className="mb-0">
          เงื่อนไขฉบับนี้ใช้กับการเข้าใช้งานเว็บไซต์ {brandName} และการสั่งซื้อสินค้าผ่านเว็บไซต์นี้
          ซึ่งดำเนินการโดย <strong>{companyLegal}</strong> หากคุณใช้เว็บไซต์ต่อไป
          ถือว่าคุณยอมรับเงื่อนไขเหล่านี้
        </p>

        <h2 className="mt-4">1) ขอบเขตการให้บริการ</h2>
        <ul>
          <li>เว็บไซต์นี้เป็นช่องทางนำเสนอสินค้าและรับคำสั่งซื้อ (เน้นการสั่งซื้อแบบเก็บเงินปลายทาง/COD)</li>
          <li>เรามีสิทธิ์ปรับปรุง เนื้อหา รายการสินค้า ราคา โปรโมชั่น หรือฟังก์ชันเว็บไซต์ได้ตามความเหมาะสม</li>
        </ul>

        <h2 className="mt-4">2) ความถูกต้องของข้อมูลสินค้าและราคา</h2>
        <ul>
          <li>
            เราพยายามแสดงข้อมูลสินค้า ราคา และรายละเอียดให้ถูกต้องครบถ้วนที่สุด
            แต่ข้อมูลอาจมีความคลาดเคลื่อนได้
          </li>
          <li>
            หากพบความผิดพลาดที่มีนัยสำคัญ เราขอสงวนสิทธิ์ในการติดต่อเพื่อยืนยัน/แก้ไข
            หรือยกเลิกคำสั่งซื้อ
          </li>
        </ul>

        <h2 className="mt-4">3) การสั่งซื้อ (COD) และการยืนยันคำสั่งซื้อ</h2>
        <ul>
          <li>การสั่งซื้อผ่านเว็บไซต์นี้เป็นการให้ข้อมูลเพื่อจัดส่งสินค้าแบบเก็บเงินปลายทาง</li>
          <li>คุณตกลงให้ข้อมูลจัดส่งเป็นความจริง ครบถ้วน และสามารถติดต่อได้</li>
          <li>
            ทีมงานอาจติดต่อเพื่อยืนยันคำสั่งซื้อก่อนจัดส่ง
          </li>
        </ul>

        <h2 className="mt-4">4) การจัดส่ง</h2>
        <ul>
          <li>จัดส่งภายในประเทศไทย</li>
          <li>ระยะเวลาจัดส่งเป็นเพียงการประมาณการ</li>
        </ul>

        <h2 className="mt-4">5) การปฏิเสธรับพัสดุ</h2>
        <p>
          หากมีการปฏิเสธรับพัสดุหรือยกเลิกซ้ำ ๆ โดยไม่มีเหตุอันสมควร
          เราขอสงวนสิทธิ์ในการจำกัดการให้บริการในอนาคต
        </p>

        <h2 className="mt-4">6) การคืนสินค้า/การรับประกัน</h2>
        <p>
          เป็นไปตาม{" "}
          <Link href="/refund-policy">นโยบายการคืนสินค้า</Link> และ{" "}
          <Link href="/security">นโยบายความปลอดภัยข้อมูล</Link>
        </p>

        <h2 className="mt-4">7) ข้อห้ามในการใช้งาน</h2>
        <ul>
          <li>ห้ามใช้เว็บไซต์ในทางที่ผิดกฎหมาย</li>
          <li>ห้ามเข้าถึงระบบโดยไม่ได้รับอนุญาต</li>
        </ul>

        <h2 className="mt-4">8) ทรัพย์สินทางปัญญา</h2>
        <p>
          เนื้อหาทั้งหมดเป็นทรัพย์สินของ {brandName}
        </p>

        <h2 className="mt-4">9) ข้อจำกัดความรับผิด</h2>
        <p>
          เราจะพยายามดูแลเว็บไซต์ให้ใช้งานได้อย่างต่อเนื่อง
        </p>

        <h2 className="mt-4">10) ความเป็นส่วนตัว</h2>
        <p>
          เป็นไปตาม <Link href="/privacy">นโยบายความเป็นส่วนตัว</Link>
        </p>

        <h2 className="mt-4">11) กฎหมายที่ใช้บังคับ</h2>
        <p>อยู่ภายใต้กฎหมายไทย</p>

        <h2 className="mt-4">12) ติดต่อเรา</h2>
        <p className="mb-3">
          <strong>{companyLegal}</strong>
          <br />
          ที่อยู่: {companyAddress}
          <br />
          โทร: {contactPhone}
          <br />
          อีเมล: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>

        {/* ===== Commercial Registration ===== */}
        <div className="mt-4">
          <h3 className="h5 mb-3">เอกสารทะเบียนพาณิชย์</h3>
          <CommercialRegistration />
        </div>
      </div>
    </section>
  );
}
