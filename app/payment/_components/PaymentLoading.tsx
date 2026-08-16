import { Loader2 } from "lucide-react";

type PaymentLoadingProps = {
  title: string;
  description: string;
};

export default function PaymentLoading({
  title,
  description,
}: PaymentLoadingProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070A0F] px-4 text-white">
      <div className="w-full max-w-md rounded-[28px] border border-slate-800 bg-[#0D1118] p-8 text-center shadow-2xl shadow-black/40">

        {/* Loader */}
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center">

          <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/10" />

          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10">
            <Loader2
              size={30}
              className="animate-spin text-blue-400"
            />
          </div>

        </div>

        {/* Text */}
        <h2 className="mt-6 text-xl font-bold text-white">
          {title}
        </h2>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
          {description}
        </p>

        {/* Progress */}
        <div className="mx-auto mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-blue-500" />
        </div>

      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }

          50% {
            transform: translateX(100%);
          }

          100% {
            transform: translateX(250%);
          }
        }
      `}</style>
    </main>
  );
}