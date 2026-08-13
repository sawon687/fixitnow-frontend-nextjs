"use client";

import React, { useActionState, useEffect, useState } from "react";
import {
  Plus,
  Wrench,
  FileText,
  Tag,
  Loader2,
  ArrowRight,
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

import { Category } from "../../../../../../../utils/type";
import { createService } from "../_actions/serviceActions";
import { getCategre } from "../../../../../../../commonService/getCategrie";
import { toast } from "sonner";
import { CardFooter } from "../../../../../../../components/ui/card";

const initialState = {
  success: false,
  message: "",
  errors: [] as {
    field: string;
    message: string;
  }[],
};

const CreateServiceDialog = () => {
  const [open, setOpen] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  // 
  // Form States
  // 

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [priceType, setPriceType] = useState("");

  // 
  // Action State
  // 

  const [state, action, isPending] = useActionState(
    createService,
    initialState
  );

  // 
  // Load Categories
  // 

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await getCategre();

        console.log("CATEGORY RESULT:", result);

        const categoryList = result?.data ?? [];

        setCategories(categoryList);
      } catch (error) {
        console.log("Category loading error:", error);
      }
    };

    loadCategories();
  }, []);

  // 
  // Action Response
  // 

  useEffect(() => {
    if (!state) return;

    // 
    // SUCCESS
    // 

    if (state.success) {
      toast.success(state.message);

      // Only SUCCESS হলে form clear হবে
      setTitle("");
      setCategoryId("");
      setDescription("");
      setPrice("");
      setPriceType("");

      // Dialog close
      setOpen(false);

      return;
    }

    // 
    // ERROR
    // 

    if (!state.success) {
      if (state.errors && state.errors.length > 0) {
        toast.error(state.errors[0].message);
      } else if (state.message) {
        toast.error(state.message);
      }

      // IMPORTANT:
      // এখানে কোনো input reset করছি না।
      // তাই আগের value 그대로 থাকবে।
    }
  }, [state]);

  // 
  // Reset form when manually
  // closing dialog
  // 

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    // User যদি নিজে dialog close করে
    if (!value) {
      setTitle("");
      setCategoryId("");
      setDescription("");
      setPrice("");
      setPriceType("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="h-11 rounded-xl px-5 shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          Create Service
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl p-0 sm:max-w-[620px]">
        {/* 
            Header
         */}

        <div className="border-b bg-muted/20 px-6 py-5">
          <DialogHeader>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <Wrench className="h-6 w-6 text-primary" />
              </div>

              <div>
                <DialogTitle className="text-xl font-bold">
                  Create New Service
                </DialogTitle>

                <DialogDescription className="mt-1">
                  Add a service that customers can book from your profile.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* 
            Form
         */}

        <form action={action} className="space-y-6 px-6 py-6">
          {/* 
              Service Information
           */}

          <div>
            <div className="mb-4">
              <h3 className="font-semibold">Service Information</h3>

              <p className="text-xs text-muted-foreground">
                Basic information about your service.
              </p>
            </div>

            <div className="space-y-4">
              {/* 
                  Title
               */}

              <div className="space-y-2">
                <Label htmlFor="title">Service Title</Label>

                <div className="relative">
                  <Wrench className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Professional AC Repair"
                    className="h-11 rounded-xl pl-10"
                  />
                </div>
              </div>

              {/* 
                  Category
               */}

              <div className="space-y-2">
                <Label>Category</Label>

                <Select
                  name="categoryId"
                  value={categoryId}
                  onValueChange={setCategoryId}
                >
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 
                  Description
               */}

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>

                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                  <Textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what your service includes..."
                    className="min-h-[110px] resize-none rounded-xl pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 
              Pricing
           */}

          <div className="border-t pt-6">
            <div className="mb-4">
              <h3 className="font-semibold">Pricing</h3>

              <p className="text-xs text-muted-foreground">
                Set the price customers will pay for this service.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* 
                  Price
               */}

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>

                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                    ৳
                  </span>

                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="1500"
                    className="h-11 rounded-xl pl-8"
                  />
                </div>
              </div>

              {/* 
                  Price Type
               */}

              <div className="space-y-2">
                <Label>Price Type</Label>

                <Select
                  name="priceType"
                  value={priceType}
                  onValueChange={setPriceType}
                >
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select price type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Fixed">
                      Fixed Price
                    </SelectItem>

                    <SelectItem value="Hourly">
                      Hourly
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* 
              Service Status
        = */}

          <div className="rounded-xl border bg-muted/20 p-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-lg bg-primary/10 p-2">
                <Tag className="h-4 w-4 text-primary" />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Service visibility
                </p>

                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  New services will be active by default and available
                  for customers to book.
                </p>
              </div>
            </div>
          </div>

          {/*
              footer
           */}

          <div className="border-t pt-5">
            <CardFooter className="flex justify-end gap-4 p-0">
              {/* Cancel */}

              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="h-11 rounded-xl"
              >
                Cancel
              </Button>

              {/* Submit */}

              <Button
                disabled={isPending}
                type="submit"
                className="bg-emerald-600 py-5 hover:bg-emerald-500"
              >
                {isPending ? (
                  <>
                    <span>Creating Service...</span>

                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>Publish Service</span>

                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServiceDialog;