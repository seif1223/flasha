import { MapPin, Phone, Instagram } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            أول مساحة قراءة في العجمي + Work space
          </p>
        </div>
        <div className="text-sm space-y-2 text-foreground/80">
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-secondary" />  عمارة الغربية ،جوار مدرسة الأورمان،العجمي، الإسكندرية</p>
          <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-secondary" /> 01286953347</p>
        </div>
        <div className="text-sm text-muted-foreground">
          <h4 className="font-display text-base text-primary mb-3">مواعيد العمل</h4>
          <p>فترات العمل: 10 ص الى 10 م</p>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()}  مكتبة عُزلة. جميع الحقوق محفوظة. لدعاء يوسف
      </div>
    </footer>
  );
}
