import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { books } from "../data/books"; // يقرأ مصفوفة النصوص الخاصة بك كما هي تماماً

// استيراد الصور المتاحة في مجلد assets بناءً على الأسماء الموجودة بجهازك
import art1 from "../assets/أكرهك لا تتركني.jpg";
import art2 from "../assets/الوحش الذي يسكنك.jpg";
import art3 from "../assets/فن اللامبالاة.jpg";
import art4 from "../assets/الجلاد تحت جلدي.jpg";
import art5 from "../assets/ممتلئ بالفراغ.jpg";
import art6 from "../assets/أحببت وغداً.jpg";
import art7 from "../assets/أبي الذي أكره.jpg";
import art8 from "../assets/مجموعة أبابيل.jpeg"; 
import art9 from "../assets/ثلاثية أرض زيكولا.png"; 
import art10 from "../assets/واحة اليعقوب.jpg";
import art11 from "../assets/تروفانتس.jpg";
import art12 from "../assets/أذما.jpg";
import art13 from "../assets/ما لا نبوح به.jpg";
import art14 from "../assets/الزعفرانة.jpg";
import art15 from "../assets/في قلبي أنثى عبرية.jpg";
import art16 from "../assets/أول مرة أتدبر القرآن.jpg";
import art17 from "../assets/ثلاثية ست الحسن.jpg";
import art18 from "../assets/رجال من المريخ ونساء من الزهرة.jpg";
import art19 from "../assets/ما لا يسع المسلم جهله.jpg";

// خريطة ذكية لربط النص بالملف المستورد بدون التعديل على ملف books.ts
const imageMap: Record<string, string> = {
  "أكرهك لا تتركني": art1,
  "الوحش الذي يسكنك": art2,
  "فن اللامبالاة": art3,
  "الجلاد تحت جلدي": art4,
  "ممتلئ بالفراغ": art5,
  "أحببت وغداً": art6,
  "أبي الذي أكره": art7,
  "مجموعة أبابيل": art8,
  "ثلاثية أرض زيكولا": art9,
  "واحة اليعقوب": art10,
  "تروفانتس": art11,
  "أذما": art12,
  "ما لا نبوح به": art13,
  "الزعفرانة": art14,
  "في قلبي أنثى عبرية": art15,
  "أول مرة أتدبر": art16, // مربوط بكتاب أول مرة أتدبر
  "ثلاثية ست الحسن": art17,
  "رجال من المريخ": art18, // مربوط بكتاب رجال من المريخ
  "ما لا يسع المسلم": art19, // مربوط بكتاب ما لا يسع المسلم
};

const palettes = [
  ["#D89B63", "#4A2E1B"],
  ["#C87A4B", "#2F1C10"],
  ["#EADBC8", "#4A2E1B"],
  ["#D89B63", "#C87A4B"],
  ["#A5673F", "#2F1C10"],
];

function gradientFor(idx: number) {
  const [a, b] = palettes[idx % palettes.length];
  return `linear-gradient(160deg, ${a} 0%, ${b} 100%)`;
}

export function BookShowcase() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const sl = Math.abs(el.scrollLeft);
    setCanPrev(sl > 4);
    setCanNext(sl < max - 4);
  };

  useEffect(() => {
    updateButtons();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir * -amount, behavior: "smooth" });
  };

  return (
    <section id="books" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between mb-10 gap-6">
          <div>
            <p className="text-secondary font-medium mb-2 text-sm tracking-wide">مكتبتنا</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">
              كتب من رفوفنا
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg">
              مجموعة منتقاة بعناية من الأدب العربي والعالمي، الفكر، والروايات. كلها متاحة للقراءة داخل المكتبة.
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              aria-label="السابق"
              className="h-12 w-12 rounded-full bg-card border border-border flex items-center justify-center text-primary shadow-soft transition disabled:opacity-30 hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              aria-label="التالي"
              className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-soft transition disabled:opacity-30 hover:bg-secondary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          <style>{`#books div::-webkit-scrollbar{display:none}`}</style>
          {books.map((title, idx) => {
            const hasCover = imageMap[title];

            return (
              <motion.article
                key={title + idx}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="snap-start shrink-0 w-[230px] md:w-[260px] rounded-3xl bg-card border border-border/60 shadow-soft overflow-hidden flex flex-col"
              >
                {/* إذا كانت الصورة موجودة في الخريطة اعرضها، غير ذلك أظهر غلاف التدرج الملون */}
                {hasCover ? (
                  <div className="relative h-72 w-full overflow-hidden bg-accent/10">
                    <img 
                      src={hasCover} 
                      alt={title} 
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div
                    className="relative h-72 flex items-center justify-center rounded-t-full overflow-hidden"
                    style={{ background: gradientFor(idx) }}
                  >
                    <div className="absolute inset-x-6 top-6 bottom-10 rounded-t-full border border-white/20" />
                    <div className="relative z-10 flex flex-col items-center text-center px-6">
                      <BookOpen className="h-7 w-7 text-white/80 mb-3" />
                      <p className="font-display text-white text-lg leading-tight line-clamp-4">
                        {title}
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                  <h3 className="font-heading font-semibold text-primary line-clamp-2 min-h-[3rem]">
                    {title}
                  </h3>
                  <span className="self-start text-xs font-medium px-3 py-1 rounded-full bg-accent/30 text-primary border border-accent/50">
                    متاح للقراءة داخلياً
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="flex md:hidden justify-center gap-2 mt-4">
          <button
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            className="h-11 w-11 rounded-full bg-card border border-border flex items-center justify-center text-primary shadow-soft disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            className="h-11 w-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-soft disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}