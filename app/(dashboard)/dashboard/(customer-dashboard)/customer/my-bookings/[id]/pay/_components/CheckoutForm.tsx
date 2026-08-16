"use client";

import React, { useState } from "react";

import { Lock, ShieldCheck } from "lucide-react";
import { createPaymentAction } from '../_action/action';


type CheckoutFormProps = {
  bookingId: string;
  total: number;
};

export default function CheckoutForm({
  bookingId,
  total,
}: CheckoutFormProps) {
  const [loading,setLoading]=useState(false)
 const handlePayment=async()=>{
       try {
            setLoading(true)
        await createPaymentAction(bookingId)
       }finally{
         setLoading(false)
       }
 }

  return (

<div>

      {/* SECURITY */}

      <div className="rounded-2xl border border-blue-500/10 bg-blue-500/5 p-4">

        <div className="flex gap-3">

          <ShieldCheck
            size={20}
            className="shrink-0 text-blue-400"
          />

          <div>

            <p className="text-sm font-semibold text-blue-300">
              Secure Stripe Payment
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Your card information is securely
              handled by Stripe.
            </p>

          </div>

        </div>

      </div>

      {/* PAY BUTTON */}

      <button
        type="submit"
        onClick={handlePayment}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >

        {
        
        
        loading ? (
           <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

            Processing Payment...
          </>
        ) :
        
        (
          <>
            <Lock size={18} />

            Pay ৳{total.toFixed(2)}
          </>
        )}

      </button>

      <p className="text-center text-xs text-slate-600">
        Your payment is securely processed by Stripe.
      </p>

</div>




  );
}