"use client";

import React, { useState } from "react";
import {
  Layers3,
  CheckCircle2,
  XCircle,
  Plus,
} from "lucide-react";

import SearchBox from "./SearchBox";
import ModalFrom from "./ModalFrom";
import Actionbutton from "./Actionbutton";

import { Category } from "../../../../../../../utils/type";
import { Button } from "../../../../../../../components/ui/button";

type CategoryProps = {
  allcategory: Category[];
  totalCategoryCount: number;
  activeCategoryCount: number;
  inactiveCategoryCount: number;
};

type CategoryClientViewProps = {
  result: CategoryProps;
};

const CategoryClientView = ({ result }: CategoryClientViewProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(
    null
  );

  const {
    allcategory: categories,
    totalCategoryCount: categoryCount,
    activeCategoryCount: activeCount,
    inactiveCategoryCount: inactiveCount,
  } = result;

  const openCreateDialog = () => {
    setEditingCategory(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };





  return (
    <div className="min-h-screen bg-[#070A0F] px-4 py-6 text-white md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <Layers3 className="h-4 w-4" />
              <span>Admin</span>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400">Categories</span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Category Management
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Create and manage service categories for your platform.
            </p>
          </div>

          <Button
            onClick={openCreateDialog}
            className="h-10 gap-2 rounded-xl px-4 shadow-lg shadow-primary/10"
          >
            <Plus className="h-4 w-4" />
            Create Category
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="group rounded-2xl border border-white/[0.08] bg-[#0D1118] p-5 transition-all duration-200 hover:border-blue-500/20 hover:bg-[#10151E]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Total Categories
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  {categoryCount}
                </h2>

                <p className="mt-1 text-xs text-gray-600">
                  All service categories
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition group-hover:scale-105">
                <Layers3 className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="group rounded-2xl border border-white/[0.08] bg-[#0D1118] p-5 transition-all duration-200 hover:border-emerald-500/20 hover:bg-[#10151E]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Active Categories
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  {activeCount}
                </h2>

                <p className="mt-1 text-xs text-gray-600">
                  Currently available
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition group-hover:scale-105">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="group rounded-2xl border border-white/[0.08] bg-[#0D1118] p-5 transition-all duration-200 hover:border-red-500/20 hover:bg-[#10151E]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">
                  Inactive Categories
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  {inactiveCount}
                </h2>

                <p className="mt-1 text-xs text-gray-600">
                  Currently disabled
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400 transition group-hover:scale-105">
                <XCircle className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D1118] shadow-2xl shadow-black/10">
          <div className="border-b border-white/[0.06] p-4 md:p-5">
            <SearchBox />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.015] text-left text-[11px] font-medium uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Services</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr
                      key={category.id}
                      className="group border-b border-white/[0.05] transition-colors hover:bg-white/[0.025]"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-sm font-semibold uppercase text-gray-300">
                            {category.name.charAt(0)}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-medium text-gray-100">
                              {category.name}
                            </p>

                            <p className="mt-1 text-xs text-gray-600">
                              {new Date(
                                category.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="max-w-sm px-6 py-5">
                        <p className="line-clamp-2 text-sm leading-6 text-gray-400">
                          {category.description ||
                            "No description available"}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <span className="inline-flex items-center rounded-lg border border-white/[0.06] bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-gray-300">
                          {category._count.services}{" "}
                          {category._count.services === 1
                            ? "service"
                            : "services"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        {category.status === "ACTIVE" ? (
                          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/10 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/10 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.6)]" />
                            Inactive
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-5 text-right">
                        <Actionbutton
                          category={category}
                          onEdit={openEditDialog}
                          
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04]">
                          <Layers3 className="h-5 w-5 text-gray-600" />
                        </div>

                        <p className="font-medium text-gray-300">
                          No categories found
                        </p>

                        <p className="mt-1 text-sm text-gray-600">
                          Create a category to get started.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalFrom
        dialogOpen={isDialogOpen}
        dialogClose={() => setIsDialogOpen(false)}
        category={editingCategory as Category}
      />
    </div>
  );
};

export default CategoryClientView;