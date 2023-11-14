const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export default function Loading() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden flex flex-col gap-2 items-center`}
    >
      <div className="h-[48px] w-full bg-background rounded-lg" />
      <div className="h-[50px] w-[50px] bg-background rounded-full p-3 border border-border hover:border-border-light transition-colors" />
      <div className="h-[48px] w-full bg-background rounded-lg" />
    </div>
  );
}
