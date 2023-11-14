const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export default function Loading() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden flex flex-col gap-2 items-center`}
    >
      <div className="h-[48px] w-full bg-background rounded-lg" />
      <RatesTableSkeleton />
    </div>
  );
}

export function RatesTableSkeleton() {
  return (
    <div className="mt-2 h-96 w-full">
      <div className="w-full h-[40px]" />
      <div className="w-full h-[42px] border-b-2 border-border" />
      <div className="w-full h-[42px] border-b-2 border-border" />
      <div className="w-full h-[42px] border-b-2 border-border" />
      <div className="w-full h-[42px] border-b-2 border-border" />
      <div className="w-full h-[42px] border-b-2 border-border" />
      <div className="w-full h-[42px] border-b-2 border-border" />
      <div className="w-full h-[42px] border-b-2 border-border" />
    </div>
  );
}
