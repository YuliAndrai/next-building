"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { ShoppingBag, ArrowUpRight } from "lucide-react";

export function MerchSection() {
  return (
    <section id="merch" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-black border-t border-neutral-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4 pb-6 border-b border-neutral-800">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-ultra text-[#FF0000] font-semibold block mb-2">
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
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-[#FF0000] transition-colors"
          >
            <span>VISIT FULL STORE</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Products Grid or Coming Soon State */}
        {siteConfig.merch.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.merch.map((item) => (
              <div
                key={item.id}
                className="group bg-neutral-950 border border-neutral-800 rounded-sm hover:border-[#FF0000]/60 transition-colors duration-200 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-900 rounded-t-sm">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale contrast-125 group-hover:grayscale-0"
                  />

                  {item.badge && (
                    <span className={`absolute top-2 left-2 text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 border rounded-sm ${
                      item.badge === "NEW" 
                        ? "bg-white text-black border-white" 
                        : "bg-black text-[#FF0000] border-[#FF0000]"
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

                  <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <span className="text-sm font-black font-mono text-white">
                      {item.price}
                    </span>

                    <a
                      href={item.link}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#FF0000] bg-black text-white hover:bg-[#FF0000] hover:text-black transition-all duration-300 shadow-none hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] text-[10px] font-bold uppercase tracking-widest rounded-sm font-mono"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>ORDER</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-neutral-800 bg-neutral-950 p-10 text-center rounded-sm">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-2">
              <span className="text-[#FF0000]">{"//"}</span> PRÓXIMO LANZAMIENTO <span className="text-[#FF0000]">{"//"}</span> TOUR CAPSULE 2026
            </span>
            <p className="text-sm text-neutral-400 font-mono">
              La tienda oficial se encuentra en preparación. Nuevos vinilos y prendas oficiales estarán disponibles próximamente.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
