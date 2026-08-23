"use client";

import React, { useActionState, useEffect, useState } from "react";
import {
  Plus,
  Wrench,
  FileText,
  Tag,
  Loader2,
  ArrowRight,
  Layers3,
  CircleDollarSign,
  Sparkles,

  Pencil,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Category, IService } from "../../../../../../../utils/type";
import { createService } from "../_actions/serviceActions";
import { getCategre } from "../../../../../../../commonService/getCategrie";
import { toast } from "sonner";
import Link from 'next/link';

const initialState = {
  success: false,
  message: "",
  errors: [] as {
    field: string;
    message: string;
  }[],
};
type CreateDialog={
  service?:IService,
  isEdit:boolean
}
const CreateServiceDialog = ({service,isEdit}:CreateDialog) => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [title, setTitle] = useState(service?.title);
  const [categoryId, setCategoryId] = useState(service?.categoryId);
  const [description, setDescription] = useState(service?.description);
  const [price, setPrice] = useState(service?.price);
  const [priceType, setPriceType] = useState(service?.priceType);

  const [state, action, isPending] = useActionState(
    createService,
    initialState
  );

  // -----------------------------
  // Load Categories
  // -----------------------------
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await getCategre();

        const categoryList = result?.data ?? [];

        setCategories(categoryList.allcategory ?? []);
      } catch (error) {
        console.log("Category loading error:", error);
      }
    };

    loadCategories();
  }, []);

  // -----------------------------
  // Action Response
  // -----------------------------
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);

      setTitle("");
      setCategoryId("");
      setDescription("");
      setPrice(0);
      setPriceType("");

      setOpen(false);

      return;
    }

    if (!state.success) {
      if (state.errors?.length > 0) {
        toast.error(state.errors[0].message);
      } else if (state.message) {
        toast.error(state.message);
      }
    }
  }, [state]);

  // -----------------------------
  // Reset Form
  // -----------------------------
  const resetForm = () => {
    setTitle("");
    setCategoryId("");
    setDescription("");
    setPrice(0);
    setPriceType("");
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (!value) {
      resetForm();
    }
  };
const isEditMode=Boolean(service?.id)
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* Trigger */}
 
  {isEdit ? (
    <DialogTrigger asChild>
    <Button
      type='button'
      className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
    >
      <Pencil size={16} />
      <span>Edit</span>
    </Button>
    </DialogTrigger>
  ) : (
    <DialogTrigger asChild>
      <Button
        type="button"
        className="h-11 rounded-xl bg-emerald-600 px-5 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-md"
      >
        <Plus className="mr-2 h-4 w-4" />
        <span>Create Service</span>
      </Button>
    </DialogTrigger>
  )}

  {/* DialogContent এখানে থাকবে */}


      {/* Modal */}
      <DialogContent
        className="
          max-h-[92vh]
          overflow-y-auto
          rounded-3xl
          border
          bg-background
          p-0
          shadow-2xl
          sm:max-w-[760px]
        "
      >
        {/* =====================================
            HEADER
        ====================================== */}
        <div className="relative overflow-hidden border-b px-7 py-6">
          {/* Background decoration */}
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 left-20 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />

          <DialogHeader className="relative">
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div
                className="
                  flex h-14 w-14 shrink-0 items-center justify-center
                  rounded-2xl
                  border
                  bg-primary/10
                  text-primary
                  shadow-sm
                "
              >
                <Wrench className="h-6 w-6" />
              </div>

              {/* Title */}
              <div className="min-w-0">
                <div className="mb-1 flex items-center gap-2">
                  <DialogTitle className="text-xl font-bold tracking-tight">
                    Create New Service
                  </DialogTitle>

                  <span className="hidden items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 sm:flex">
                    <Sparkles className="h-3 w-3" />
                    New
                  </span>
                </div>

                <DialogDescription className="max-w-xl text-sm text-muted-foreground">
                  Create a professional service that customers can discover
                  and book from your profile.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* =====================================
            FORM
        ====================================== */}
        <form action={action}>
          <div className="space-y-6 px-7 py-6">
            {/* =================================
                SERVICE INFORMATION
            ================================== */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                  <Layers3 className="h-4 w-4 text-primary" />
                </div>

                <div>
                  <h3 className="text-sm font-bold">
                    Service Information
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    Add the basic details of your service.
                  </p>
                </div>
              </div>
              {/* service id */}
              {

                 isEditMode&&<input type="hidden" name='serviceId' value={service?.id} />



              }

              <input type="hidden" name='mode' value={isEditMode?'edit':'create'} />

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Title */}
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-xs font-semibold"
                  >
                    Service Title
                  </Label>

                  <div className="relative">
                    <Wrench
                      className="
                        absolute left-3 top-1/2
                        h-4 w-4
                        -translate-y-1/2
                        text-muted-foreground
                      "
                    />

                    <Input
                      id="title"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Professional AC Repair"
                      className="
                        h-11
                        rounded-xl
                        border-muted-foreground/20
                        bg-muted/20
                        pl-10
                        transition-all
                        focus:bg-background
                      "
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">
                    Category
                  </Label>

                  <Select
                    name="categoryId"
                    value={categoryId}
                    onValueChange={setCategoryId}
                  >
                    <SelectTrigger
                      className="
                        h-11
                        rounded-xl
                        border-muted-foreground/20
                        bg-muted/20
                        transition-all
                        focus:bg-background
                      "
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent className="rounded-xl">
                      {categories?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2 sm:col-span-2">
                  <Label
                    htmlFor="description"
                    className="text-xs font-semibold"
                  >
                    Description
                  </Label>

                  <div className="relative">
                    <FileText
                      className="
                        absolute left-3 top-3
                        h-4 w-4
                        text-muted-foreground
                      "
                    />

                    <Textarea
                      id="description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what your service includes, what customers can expect, and any important details..."
                      className="
                        min-h-[90px]
                        resize-none
                        rounded-xl
                        border-muted-foreground/20
                        bg-muted/20
                        pl-10
                        pt-3
                        transition-all
                        focus:bg-background
                      "
                    />
                  </div>

                  <p className="text-[11px] text-muted-foreground">
                    Keep your description clear and customer-friendly.
                  </p>
                </div>
              </div>
            </section>

            {/* =================================
                PRICING
            ================================== */}
            <section className="rounded-2xl border bg-muted/20 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
                  <CircleDollarSign className="h-4 w-4 text-emerald-600" />
                </div>

                <div>
                  <h3 className="text-sm font-bold">Pricing</h3>

                  <p className="text-xs text-muted-foreground">
                    Set how customers will be charged.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Price */}
                <div className="space-y-2">
                  <Label
                    htmlFor="price"
                    className="text-xs font-semibold"
                  >
                    Service Price
                  </Label>

                  <div className="relative">
                    <span
                      className="
                        absolute left-3 top-1/2
                        -translate-y-1/2
                        text-sm font-bold
                        text-emerald-600
                      "
                    >
                      ৳
                    </span>

                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      value={price}
                      onChange={(e) =>
                        setPrice(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                        )
                      }
                      placeholder="1500"
                      className="
                        h-11
                        rounded-xl
                        border-muted-foreground/20
                        bg-background
                        pl-8
                      "
                    />
                  </div>
                </div>

                {/* Price Type */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">
                    Pricing Type
                  </Label>

                  <Select
                    name="priceType"
                    value={priceType}
                    onValueChange={setPriceType}
                  >
                    <SelectTrigger
                      className="
                        h-11
                        rounded-xl
                        border-muted-foreground/20
                        bg-background
                      "
                    >
                      <SelectValue placeholder="Select pricing type" />
                    </SelectTrigger>

                    <SelectContent className="rounded-xl">
                      <SelectItem value="Fixed">
                        Fixed Price
                      </SelectItem>

                      <SelectItem value="Hourly">
                        Hourly Rate
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* =================================
                VISIBILITY
            ================================== */}
            <section
              className="
                relative overflow-hidden
                rounded-2xl
                border
                border-emerald-500/20
                bg-emerald-500/[0.04]
                p-5
              "
            >
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />

              <div className="relative flex items-start gap-3">
                <div
                  className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-emerald-500/10
                  "
                >
                  <Tag className="h-4 w-4 text-emerald-600" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold">
                      Service visibility
                    </p>

                    <span
                      className="
                        rounded-full
                        bg-emerald-500/10
                        px-2 py-0.5
                        text-[10px]
                        font-bold
                        text-emerald-600
                      "
                    >
                      ACTIVE
                    </span>
                  </div>

                  <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground">
                    New services are active by default and will be available
                    for customers to discover and book.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* =====================================
              FOOTER
          ====================================== */}
          <div
            className="
              flex items-center justify-between
              border-t
              bg-muted/20
              px-7 py-4
            "
          >
            <p className="hidden text-[11px] text-muted-foreground sm:block">
              Make sure all service details are accurate.
            </p>

            <div className="ml-auto flex items-center gap-3">
              {/* Cancel */}
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="
                  h-10
                  rounded-xl
                  px-5
                  font-medium
                  hover:bg-muted
                "
              >
                Cancel
              </Button>

              {/* Submit */}
              <Button
                disabled={isPending}
                type="submit"
                className="
                  h-10
                  rounded-xl
                  bg-emerald-600
                  px-5
                  font-semibold
                  shadow-sm
                  transition-all
                  hover:bg-emerald-500
                  hover:shadow-md
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    Publish Service
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServiceDialog;