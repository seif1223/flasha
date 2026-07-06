import { BookOpen } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-t-full bg-gradient-warm shadow-soft">
        <BookOpen className="h-5 w-5 text-primary-foreground" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold text-primary">عُزلة</span>
        <span className="text-[10px] tracking-widest text-muted-foreground">Azla</span>
      </div>
    </div>
  );
}
