"use client";

import { useState } from "react";
import { useAdminCategories } from "@/features/admin-categories/api/use-admin-categories";
import { adminCategoriesService } from "@/features/admin-categories/api/admin-categories-service";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export default function AdminCategoriesPage() {
  const { data: categories, refetch } = useAdminCategories();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const handleCreate = async () => {
    await adminCategoriesService.create({ name, slug, isActive: true });
    setName("");
    setSlug("");
    await refetch();
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    await adminCategoriesService.updateActive(id, isActive);
    await refetch();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-montserrat font-bold text-brand-teal">Categories</h1>
        <p className="text-sm text-brand-charcoal/70">Manage product categories.</p>
      </div>

      <div className="bg-white p-6 rounded-sm border border-brand-teal/10 space-y-4">
        <h2 className="text-lg font-semibold text-brand-teal">Create Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
          <Button className="bg-brand-teal hover:bg-brand-teal/90 text-white" onClick={handleCreate}>
            Add Category
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-sm border border-brand-teal/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-brand-teal/5 text-brand-teal uppercase text-xs">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Slug</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {(categories ?? []).map((category) => (
              <tr key={category.id} className="border-t border-brand-teal/10">
                <td className="px-4 py-3">{category.name}</td>
                <td className="px-4 py-3 text-brand-charcoal/60">{category.slug}</td>
                <td className="px-4 py-3">{category.isActive ? "Active" : "Inactive"}</td>
                <td className="px-4 py-3 text-right">
                  <Button
                    variant="outline"
                    onClick={() => toggleActive(category.id, !category.isActive)}
                  >
                    {category.isActive ? "Deactivate" : "Activate"}
                  </Button>
                </td>
              </tr>
            ))}
            {(categories ?? []).length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-brand-charcoal/60">
                  No categories found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
