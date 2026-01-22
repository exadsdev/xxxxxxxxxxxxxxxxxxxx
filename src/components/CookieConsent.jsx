'use client';

import { useEffect, useState } from 'react';

const brandName =
  process.env.NEXT_PUBLIC_BRAND_NAME || 'PG Mobile V9';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(
      'pgmobile_cookie_consent'
    );
    if (stored !== 'accepted') {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        'pgmobile_cookie_consent',
        'accepted'
      );
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="position-fixed bottom-0 start-0 end-0"
      style={{
        zIndex: 1080
      }}
    >
      <div className="container-md pb-3">
        <div className="card shadow-lg border-0">
          <div className="card-body d-flex flex-column flex-md-row align-items-md-center gap-3">
            <div className="flex-grow-1">
              <h6 className="mb-1">
                การใช้คุกกี้และการประมวลผลข้อมูล
              </h6>
              <p className="small mb-1">
                เว็บไซต์ {brandName}{' '}
                ใช้คุกกี้และเทคโนโลยีที่คล้ายกันเพื่อปรับปรุงประสบการณ์ใช้งาน
                วิเคราะห์การใช้งานเว็บไซต์ และวัดผลโฆษณา (เช่น Google
                Ads / Google Analytics) ข้อมูลที่เก็บจะถูกใช้ตามนโยบายที่ระบุไว้
              </p>
              <p className="small mb-0">
                โดยการกด “ยอมรับและปิด”
                ถือว่าคุณยินยอมให้เราใช้คุกกี้ตาม{' '}
                <a href="/privacy" className="text-decoration-underline">
                  นโยบายความเป็นส่วนตัว
                </a>{' '}
                และ{' '}
                <a href="/terms" className="text-decoration-underline">
                  เงื่อนไขการใช้งาน
                </a>{' '}
                ของเว็บไซต์นี้
              </p>
            </div>
            <div className="d-flex flex-column flex-sm-row gap-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAccept}
              >
                ยอมรับและปิด
              </button>
              <a
                href="/privacy"
                className="btn btn-outline-secondary btn-sm"
              >
                อ่านรายละเอียดนโยบาย
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
