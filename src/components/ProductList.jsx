'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';

export default function ProductList({ products, brandName }) {
    const { addToCart, cartCount } = useCart();
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddToCart = (product) => {
        addToCart(product, 1);
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section id="products" className="py-4 py-md-5">
            <div className="container-md">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-3">
                    <div>
                        <h2 className="h3 mb-1">สินค้าแนะนำ</h2>
                        <span className="text-muted small">
                            มือถือ {brandName} ทุกรุ่นพร้อมประกันศูนย์ไทย
                        </span>
                    </div>
                    <div style={{ minWidth: 260 }}>
                        <label className="form-label small mb-1">ค้นหาสินค้า</label>
                        <div className="input-group">
                            <input
                                type="search"
                                className="form-control form-control-sm"
                                placeholder="ค้นหาชื่อรุ่น หรือคำสำคัญ เช่น V9, Series 3"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Link
                                href="/cart"
                                className="btn btn-outline-dark d-flex align-items-center"
                                aria-label="ไปที่ตะกร้าสินค้า"
                            >
                                <span style={{ fontSize: 18, lineHeight: 1 }}>🛒</span>
                                <span className="d-none d-sm-inline ms-1">ตะกร้า</span>
                                {cartCount > 0 && (
                                    <span className="badge bg-danger ms-2">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row g-4 product-content">
                    {filteredProducts.length === 0 ? (
                        <div className="col-12">
                            <p className="text-muted">
                                ไม่พบสินค้าที่ตรงกับคำว่า{' '}
                                <strong>{searchTerm}</strong> กรุณาลองคำค้นอื่น
                                หรือดูสินค้าทั้งหมดบนหน้านี้
                            </p>
                        </div>
                    ) : (
                        filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                id={product.id}
                                className="col-6 col-md-4 col-lg-3"
                            >
                                <div className="card product-card h-100 border-0 shadow-sm">
                                    <div className="position-relative">
                                        <Image
                                            src={product.image}
                                            className="card-img-top product-image"
                                            alt={product.name}
                                            width={360}
                                            height={280}
                                        />
                                        {product.badge && (
                                            <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                                                {product.badge}
                                            </span>
                                        )}

                                        <div className="position-absolute bottom-0 end-0 m-2">
                                            <button
                                                type="button"
                                                className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center"
                                                style={{
                                                    width: 36,
                                                    height: 36,
                                                    fontSize: 18,
                                                    padding: 0
                                                }}
                                                onClick={() => handleAddToCart(product)}
                                                aria-label="เพิ่มลงตะกร้า"
                                            >
                                                🛒
                                            </button>
                                        </div>
                                    </div>

                                    <div className="card-body d-flex flex-column">
                                        <h3 className="card-title fs-6 fw-normal mb-1">
                                            {product.name}
                                        </h3>
                                        <div className="mt-auto d-flex justify-content-between align-items-center">
                                            <span className="fw-bold text-danger">
                                                ฿{product.price.toLocaleString('th-TH')}
                                            </span>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-black hvr-sweep-to-right d-flex align-items-center"
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                🛒
                                                <span className="ms-1">เพิ่มลงตะกร้า</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
