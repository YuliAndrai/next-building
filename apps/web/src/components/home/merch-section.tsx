"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { ShoppingBag, ArrowUpRight } from "lucide-react";

export function MerchSection() {
  return (
    <section id="merch" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-black border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4 pb-6 border-b border-neutral-900">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-ultra text-red-600 font-semibold block mb-2">
              {"// OFFICIAL STORE"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-widest text-white">
              MERCHANDISE
            </h2>
            <p className="mt-2 text-xs uppercase tracking-widest text-neutral-400">
              Official tour apparel, limited vinyl pressings, and tactical rave wear.
            </p>
          </div>

          <a
            href={siteConfig.announcement.link}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-neutral-300"
          >
            <span>VISIT FULL STORE</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.merch.map((item) => (
            <div
              key={item.id}
              className="group bg-neutral-950 border border-neutral-900 hover:border-neutral-700 transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-square w-full overflow-hidden bg-neutral-900">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale contrast-125 group-hover:grayscale-0"
                />

                {item.badge && (
                  <span className={`absolute top-2 left-2 text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 border ${
                    item.badge === "NEW" 
                      ? "bg-white text-black border-white" 
                      : "bg-red-950/80 text-red-400 border-red-800"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-white group-hover:text-neutral-200 line-clamp-2">
                    {item.name}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-900 flex items-center justify-between">
                  <span className="text-sm font-black font-mono text-white">
                    {item.price}
                  </span>

                  <a
                    href={item.link}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-white hover:text-black text-neutral-200 text-[10px] font-bold uppercase tracking-widest transition-colors border border-neutral-800"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>ORDER</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
