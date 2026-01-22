// app/security/page.jsx
import CommercialRegistration from "@/components/CommercialRegistration";


export const metadata = {
  title: 'นโยบายความปลอดภัย | PG Mobile V9',
  description:
    'นโยบายความปลอดภัยของ PG Mobile V9 — มาตรการปกป้องข้อมูลและการชำระเงิน'
};

export default function SecurityPage() {
  return (
    <section className="py-4 py-md-5">
      <div className="container" style={{ maxWidth: 900 }}>
        <h1 className="mb-3">นโยบายความปลอดภัย</h1>
        <p>
          <strong>มีผลตั้งแต่:</strong> ระบุวันที่เริ่มใช้
        </p>

        <h2 className="mt-4">มาตรการปกป้องข้อมูล</h2>
        <ul>
          <li>ใช้การเชื่อมต่อเข้ารหัส (HTTPS/SSL) สำหรับการรับส่งข้อมูล</li>
          <li>จำกัดการเข้าถึงข้อมูลเฉพาะพนักงานที่จำเป็นต่อการให้บริการ</li>
          <li>มีการสำรองข้อมูลและอัปเดตระบบอย่างสม่ำเสมอ</li>
        </ul>

        <h2 className="mt-4">การชำระเงิน</h2>
        <p>
          การชำระเงินดำเนินการผ่านผู้ให้บริการภายนอกที่ได้มาตรฐานด้านความปลอดภัย
          ลูกค้าไม่ควรส่งข้อมูลบัตรเครดิตผ่านช่องทางที่ไม่ปลอดภัย เช่น อีเมล หรือแชททั่วไป
        </p>

        <h2 className="mt-4">การแจ้งเหตุการณ์ด้านความปลอดภัย</h2>
        <p>
          หากพบเหตุสงสัยด้านความปลอดภัย หรือการละเมิดข้อมูล
          กรุณาแจ้งเราทันทีที่{' '}
          <a href="mailto:support@pgmobilev9.com">support@pgmobilev9.com</a>
        </p>

        <CommercialRegistration />
      </div>
    </section>
  );
}
