'use client';

import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import Image from 'next/image';

const brandName =
  process.env.NEXT_PUBLIC_BRAND_NAME || 'Your Brand';

export default function NavBar() {
  const { cartCount } = useCart();

  return (
    <header className="site-header sticky-top bg-white border-bottom">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white"
        id="header-nav"
      >
        <div className="container-md">
          <Link href="/" className="navbar-brand d-flex align-items-center">
            <Image
              src="/images/logo.png"
              alt={brandName}
              width={40}
              height={40}
              style={{ marginRight: 8 }}
            />
            <span className="fw-bold">{brandName}</span>
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">เมนู</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item me-3">
                  <Link href="/" className="nav-link">
                    หน้าแรก
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <a href="/#products" className="nav-link">
                    สินค้า
                  </a>
                </li>
                <li className="nav-item me-3">
                  <Link href="/about" className="nav-link">
                    เกี่ยวกับเรา
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link href="/contact" className="nav-link">
                    ติดต่อเรา
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link href="/reviews" className="nav-link">
                    reviews
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link href="/cart" className="nav-link">
                    ตะกร้าสินค้า
                  </Link>
                </li>
              </ul>

              <div className="d-flex align-items-center">
                <Link
                  href="/cart"
                  className="btn btn-outline-dark position-relative d-flex align-items-center"
                >
                  <span
                    style={{
                      fontSize: 18,
                      marginRight: 6,
                      lineHeight: 1
                    }}
                  >
                    🛒
                  </span>
                  <span>ตะกร้า</span>
                  {cartCount > 0 && (
                    <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
