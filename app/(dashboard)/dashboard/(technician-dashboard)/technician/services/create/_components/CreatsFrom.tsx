// "use client";

// import { useState, useEffect, useActionState } from "react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Sparkles, ArrowRight, Layers, Loader2 } from "lucide-react";

// import { toast } from "sonner";
// import { createService } from '../_actions/serviceActions';
// import { getCategre } from '../../../../../../../../commonService/getCategrie';
// import { Category } from '../../../../../../../../utils/type';




// const initialState = {
//   success: false,
//   message: "",
//   errors: [] as {
//     field: string;
//     message: string;
//   }[],
// };

// export default function CreatsFrom() {
//   const [categories, setCategories] = useState<Category[]>([]);

//   const [selectedCategoryId, setSelectedCategoryId] = useState("");

//   const [priceType, setPriceType] = useState("Fixed");

//   const [state, action, isPending] = useActionState(
//     createService,
//     initialState,
//   );

//   // Load Categories

//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const result = await getCategre();

//         console.log("CATEGORY RESULT:", result);

//         const categoryList = result?.data ?? [];

//         setCategories(categoryList);

//         if (categoryList.length > 0) {
//           setSelectedCategoryId(categoryList[0].id);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     loadCategories();
//   }, []);


//   useEffect(() => {
//     if (!state) return;

//     if (state.success) {
//       toast.success(state.message);
//     }

//     if (!state.success && state.errors && state.errors.length > 0) {
//       toast.error(state.errors[0].message|| state.message);
//     }
//   }, [state]);

//   return (
//     <div className="min-h-screen bg-background text-foreground p-6 md:p-12 flex items-center justify-center relative overflow-hidden">
//       <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

//       <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

//       <Card className="w-full max-w-2xl bg-card/60 backdrop-blur-xl shadow-2xl">
//         <form action={action}>
//           <CardHeader className="border-b">
//             <div className="flex items-center gap-2 text-emerald-500">
//               <Sparkles className="w-4 h-4" />

//               <span>Aura Engineering Hub</span>
//             </div>

//             <CardTitle className="text-3xl">Create New Service</CardTitle>

//             <CardDescription>
//               Configure your professional service details.
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="space-y-6 pt-6">
//             {/* Category */}

//             <div className="space-y-2">
//               <Label className="flex items-center gap-2">
//                 <Layers className="w-4 h-4 text-emerald-500" />
//                 Select Category
//               </Label>

//               <Select
//                 value={selectedCategoryId}
//                 onValueChange={setSelectedCategoryId}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select category" />
//                 </SelectTrigger>

//                 <SelectContent>
//                   {categories.map((cat) => (
//                     <SelectItem key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               <input
//                 type="hidden"
//                 name="categoryId"
//                 value={selectedCategoryId}
//               />
//             </div>

//             {/* Title */}

//             <div className="space-y-2">
//               <Label>Service Title</Label>

//               <Input name="title" placeholder="Enter service title" />
//             </div>

//             {/* Description */}

//             <div className="space-y-2">
//               <Label>Description</Label>

//               <Textarea
//                 name="description"
//                 rows={4}
//                 placeholder="Enter service description"
//               />
//             </div>

//             {/* Price */}

//             <div className="grid md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label>Price (BDT)</Label>

//                 <Input name="price" type="number" defaultValue={1300} />
//               </div>

//               {/* Price Type */}

//               <div className="space-y-2">
//                 <Label>Price Type</Label>

//                 <Select value={priceType} onValueChange={setPriceType}>
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>

//                   <SelectContent>
//                     <SelectItem value="Fixed">Fixed Price</SelectItem>

//                     <SelectItem value="Hourly">Hourly Rate</SelectItem>

//                     <SelectItem value="Negotiable">Negotiable</SelectItem>
//                   </SelectContent>
//                 </Select>

//                 <input type="hidden" name="priceType" value={priceType} />
//               </div>
//             </div>
//           </CardContent>

//           <CardFooter className="border-t pt-6 flex justify-end gap-4">
//             <Button type="button" variant="outline">
//               Save Draft
//             </Button>

//             <Button
//               disabled={isPending}
//               type="submit"
//               className="bg-emerald-600 hover:bg-emerald-500"
//             >
//               {isPending ? (
//                 <Loader2 className="w-4 h-4 animate-spin" />
//               ) : (
//                 <>
//                   <span>Publish Service</span>

//                   <ArrowRight className="w-4 h-4" />
//                 </>
//               )}
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   );
// }



