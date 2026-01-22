// src/components/Item.jsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import "./home.css";
import { getShopUrl } from "@/actions/appActions";

export const dynamic = "force-dynamic";

export default async function Item() {
  const headersList = await headers();
  const userAgent = (headersList.get("user-agent") || "").toLowerCase();

  const botKeywords = [
    "bot",
    "crawl",
    "spider",
    "slurp",
    "facebookexternalhit",
    "googlebot",
    "twitterbot",
    "line",
    "ahrefs",
    "tiktok",
    "discord",
  ];

  const isBot = botKeywords.some((keyword) => userAgent.includes(keyword));

  // ✅ DB ก่อน → ถ้าว่าง fallback env (กันหน้าเว็บพัง)
  const shopUrlFromDb = await getShopUrl();
  const urls = shopUrlFromDb || process.env.SHOP_URL || "";

  const v = Date.now();
  const imageFolder = isBot ? "phone" : "phone-v9";
  const linkQuery = isBot ? "" : "&ref=mobile";

  return (
    <div className="box container p-0">
      {[1, 2, 3, 4, 5, 6].map((id) => (
        <div className="item" key={id}>
          <Link href={`${urls}/cart.php?id=${id}${linkQuery}`}>
            <div className="img-wrap">
              <Image
                src={`${urls}/img/${imageFolder}/${id}.gif?v=${v}`}
                alt={`โทรศัพท์มือถือ PG รุ่น V9 ${id}`}
                fill
                sizes="33vw"
                unoptimized
                priority
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
