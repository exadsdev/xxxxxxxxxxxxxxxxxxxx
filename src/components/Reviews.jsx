import React from 'react'
import Image from 'next/image'

const reviews = [
  { id: 1, img: '/reviews/01.jpg', title: 'PG V9', customer: 'คุณ สมเกียรติ', date: '10/10/2025' },
  { id: 2, img: '/reviews/02.jpg', title: 'PG V9', customer: 'คุณ สุทิน', date: '05/10/2025' },
  { id: 3, img: '/reviews/03.jpg', title: 'PG V9', customer: 'คุณ สุเมธ', date: '06/10/2025' },
  { id: 4, img: '/reviews/04.png', title: 'PG V9', customer: 'คุณ วัฒนา', date: '01/10/2025' },
  { id: 5, img: '/reviews/05.png', title: 'PG V9', customer: 'คุณ นฤพล', date: '02/10/2025' },
  { id: 6, img: '/reviews/06.jpg', title: 'PG V9', customer: 'คุณ ชัยวัฒน์', date: '03/10/2025' },
]

export default function Reviews({ columns = 6, limit = 6, heading = 'รีวิวจากลูกค้า' }) {
  // Use responsive row-cols: 3 columns on mobile (xs), keep `columns` for lg and up
  const colsClass = `row g-3 row-cols-3 row-cols-lg-${columns}`

  return (
    <section id="reviews" className="py-4 py-md-5">
      <div className="container-md">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h3 mb-0">{heading}</h2>
        </div>

        <div className={colsClass}>
          {reviews.slice(0, limit).map((r) => (
            <div className="col" key={r.id}>
              <div className="card h-100 text-center">
                <div className="p-2 d-flex justify-content-center align-items-center">
                  <Image src={r.img} width={120} height={120} className="rounded" alt={`review-${r.id}`} />
                </div>
                <div className="card-body">
                  <h5 className="card-title fs-6 mb-1">{r.title}</h5>
                  <p className="card-text small mb-1 review-text">ลูกค้า : {r.customer}</p>
                </div>
                <div className="card-footer bg-transparent border-0">
                  <small className="text-body-secondary">{r.date}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
