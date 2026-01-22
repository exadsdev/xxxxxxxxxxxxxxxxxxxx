'use client';

import Link from 'next/link';
import { useEffect } from 'react';

const brandName =
  process.env.NEXT_PUBLIC_BRAND_NAME || 'PG Mobile V9';
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@example.com';
const contactPhone =
  process.env.NEXT_PUBLIC_CONTACT_PHONE || '000-000-0000';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

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
                  'radial-gradient(circle at 30% 30%, #0d6efd, #6610f2)',
                color: '#fff',
                fontSize: 40
              }}
            >
              !
            </div>

            <h1 className="h3 mb-3">เกิดข้อผิดพลาดภายในระบบ</h1>
            <p className="mb-3 text-muted">
              ระบบของ {brandName} พบข้อผิดพลาดระหว่างการแสดงผลหน้าเว็บ  
              คุณสามารถลองโหลดหน้าใหม่อีกครั้ง หากยังพบปัญหาอยู่
              กรุณาติดต่อทีมงานเพื่อช่วยตรวจสอบ
            </p>

            <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => reset()}
              >
                ลองโหลดหน้าอีกครั้ง
              </button>
              <Link href="/" className="btn btn-outline-secondary">
                กลับไปหน้าแรก
              </Link>
            </div>

            <div className="text-start small bg-white border rounded-3 p-3 mb-3">
              <h2 className="h6 mb-2">รายละเอียดทางเทคนิค (สำหรับผู้ดูแลระบบ)</h2>
              <p className="mb-1 text-muted">
                ข้อความข้อผิดพลาด:
              </p>
              <pre
                className="small bg-light border rounded p-2 mb-0"
                style={{
                  whiteSpace: 'pre-wrap',
                  maxHeight: 180,
                  overflow: 'auto'
                }}
              >
                {error?.message || 'ไม่ระบุข้อความข้อผิดพลาด'}
              </pre>
            </div>

            <div className="text-start small bg-white border rounded-3 p-3">
              <h2 className="h6 mb-2">ติดต่อทีมงาน</h2>
              <p className="mb-1">
                หากคุณเป็นลูกค้าและพบข้อผิดพลาดขณะใช้งาน เช่น
                เปิดดูสินค้า PG Mobile, PG Mobile V9, PG V9, PG แล้วขึ้นหน้าจอนี้
                กรุณาแจ้งรายละเอียดคร่าว ๆ เช่น หน้าที่เข้าใช้ และเวลาที่พบปัญหา
              </p>
              <p className="mb-1">
                โทร: {contactPhone}
              </p>
              <p className="mb-0">
                อีเมล:{' '}
                <a href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
