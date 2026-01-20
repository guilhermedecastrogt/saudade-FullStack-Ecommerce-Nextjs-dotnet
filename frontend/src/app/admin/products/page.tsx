"use client";

import Link from "next/link";
import { useState } from "react";
import { useAdminProducts } from "@/features/admin-products/api/use-admin-products";
import { useAdminCategories } from "@/features/admin-categories/api/use-admin-categories";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [active, setActive] = useState<string>("all");
  const { data: categories } = useAdminCategories();
  const { data: productsResponse } = useAdminProducts({
    search,
    category,
    active: active === "all" ? undefined : active === "true",
    page: 1,
    pageSize: 50,
  });

  const products = productsResponse?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-montserrat font-bold text-brand-teal">Products</h1>
          <p className="text-sm text-brand-charcoal/70">Manage catalog items, stock, and visibility.</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-brand-teal hover:bg-brand-teal/90 text-white">New Product</Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-sm border border-brand-teal/10 flex flex-wrap gap-4">
        <Input placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
        <select
          value={category ?? ""}
          onChange={(e) => setCategory(e.target.value || undefined)}
          className="border border-brand-teal/20 rounded-sm px-3 py-2 text-sm"
        >
          <option value="">All Categories</option>
          {(categories ?? []).map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select value={active} onChange={(e) => setActive(e.target.value)} className="border border-brand-teal/20 rounded-sm px-3 py-2 text-sm">
          <option value="all">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <div className="bg-white rounded-sm border border-brand-teal/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-brand-teal/5 text-brand-teal uppercase text-xs">
            <tr>
              <th className="text-left px-4 py-3">Product</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Price</th>
              <th className="text-left px-4 py-3">Inventory</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-brand-teal/10">
                <td className="px-4 py-3">
                  <div className="font-semibold text-brand-teal">{product.name}</div>
                  <div className="text-brand-charcoal/60">{product.slug}</div>
                </td>
                <td className="px-4 py-3">{product.categoryName}</td>
                <td className="px-4 py-3">
                  {new Intl.NumberFormat("en-IE", { style: "currency", currency: product.currency }).format(product.price)}
                </td>
                <td className="px-4 py-3">{product.inventory}</td>
                <td className="px-4 py-3">{product.isActive ? "Active" : "Inactive"}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/products/${product.id}`} className="text-brand-gold hover:text-brand-teal">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-brand-charcoal/60">
                  No products found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
