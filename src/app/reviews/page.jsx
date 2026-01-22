import React from 'react'
import Reviews from '@/components/Reviews'

export default function Page() {
  return (
    <>
      <Reviews columns={6} limit={6} heading="รีวิวลูกค้าทั้งหมด" />
    </>
  )
}
