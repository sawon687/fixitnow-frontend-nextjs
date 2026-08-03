'use client'
import React, { useActionState, useEffect } from 'react'

import { CardContent, CardFooter } from '../../../../../../../../components/ui/card';
import { Label } from '../../../../../../../../components/ui/label';
import { ArrowRight, FolderPlus, Loader2 } from 'lucide-react';
import { Input } from '../../../../../../../../components/ui/input';
import { Textarea } from '../../../../../../../../components/ui/textarea';
import { Button } from '../../../../../../../../components/ui/button';
import { categirePost } from './_actions/categrieActions';
import { toast } from 'sonner';

const CategrieFrom = () => {
const initialState = {
  success: false,
  message: "",
  errors: []
};

const [state, formAction, isPending] = useActionState(
  categirePost,
  initialState
);

useEffect(() => {
  if (!state) return;

  if (state.success) {
    toast.success(state.message);
  }

  if (!state.success && state.errors?.length > 0) {
    toast.error(state.errors[0].message);
  }

}, [state]);
  return (
      <div className="space-y-6">
               <form action={formAction}>

          <CardContent className="space-y-6 pt-6">
            
        
             {/* Category Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <FolderPlus className="w-4 h-4 text-emerald-500" />
                Category Name
              </Label>
              <Input
                id="name"
                name='name'
            
                className="bg-background/50 font-medium"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                name='description'
                className="bg-background/50 resize-none leading-relaxed"
              />
            </div>

         
         

          </CardContent>
           
          <CardFooter className="pt-6 border-t border-border/80 flex items-center justify-end gap-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type='submit' className="bg-emerald-600 hover:bg-emerald-500 text-emerald-950 font-semibold gap-2 shadow-lg shadow-emerald-500/20">
              {isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <span>Save Category</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </CardFooter>
             </form>
        </div>

         
  )
}

export default CategrieFrom