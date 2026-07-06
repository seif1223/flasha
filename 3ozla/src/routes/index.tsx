import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookMarked, Coffee, Users, Sparkles, ArrowLeft, Trees } from "lucide-react"; 
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BookShowcase } from "../components/BookShowcase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: " مَكتبة عُزلة | أول مساحة قراءة في العجمي" },
      { name: "description", content: "مكتبة عُزلة - مساحة دافئة وهادئة للقراءة في العجمي بالإسكندرية. احجز مقعدك بسهولة." },
      { property: "og:title", content: "مكتبة عُزلة - أول مساحة قراءة في العجمي" },
      { property: "og:description", content: "احجز مقعدك في أول مكتبة قراءة بالعجمي." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Stats />
      <Philosophy />
      <BookShowcase />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-10%] h-[480px] w-[480px] rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-secondary/20 blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-1.5 text-xs font-medium text-secondary">
            <Sparkles className="h-3.5 w-3.5" /> الأولى من نوعها في العجمي
          </span>
          <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-primary">
            مكتبة عُزلة
            <span className="block text-secondary mt-2 text-3xl md:text-4xl font-heading font-medium">
              أول مساحة للقراءة في العجمي
            </span>
          </h1>
          <p className="mt-6 text-lg text-foreground/80 leading-relaxed max-w-md">
            مكان دافئ يحتضن الكتب والقراء، صُمّم ليمنحك هدوءاً نادراً وفنجان قهوة بجانب صفحاتك المفضلة.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/booking"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-elegant transition hover:bg-secondary"
            >
              احجز تذكرتك الآن
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
            <Link
              to="/community"
              className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-7 py-3.5 text-base font-semibold text-primary hover:bg-accent/30 transition"
            >
              مجتمع القراء
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          {/* Arch frame */}
          <div className="relative aspect-[3/4] rounded-t-full bg-gradient-warm shadow-elegant overflow-hidden">
            <div className="absolute inset-4 rounded-t-full border border-white/25" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
              <BookMarked className="h-14 w-14 text-white/90 mb-6" />
              <p className="font-display text-3xl text-white leading-tight">
                "بين كل كتاب ورفّ،
                <br /> حكاية تنتظرك"
              </p>
              <div className="mt-6 h-px w-16 bg-white/40" />
              {/* تصحيح الكلمات لتبدو أكثر احترافية وفصاحة */}
              <p className="mt-4 text-sm text-white/90 leading-relaxed">
                عمارة الغربية — بجوار مدرسة الأورمان — أبو يوسف — العجمي، الإسكندرية
              </p>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden md:flex h-24 w-24 rounded-full bg-card shadow-soft items-center justify-center border border-border">
            <Coffee className="h-9 w-9 text-secondary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "+30", label: "كتاب على رفوفنا" },
    { value: "------------" },
    { value: "ساعات 10", label: "مفتوح يومياً" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="rounded-3xl bg-card border border-border/60 shadow-soft p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-4xl md:text-5xl font-bold text-primary">{s.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Philosophy() {
  const items = [
    {
      icon: BookMarked,
      title: "القراءة طقس",
      text: "نوفر لك بيئة هادئة بإضاءة دافئة ومقاعد مريحة، لتعيش لحظتك مع الكتاب كما تستحق.",
    },
    {
      icon: Coffee,
      title: "قهوة ودفء",
      text: "ركن قهوة لطيف يرافق قراءتك، مع روائح خشب ومخطوطات عتيقة.",
    },
    {
      icon: Trees, 
      title: "مجتمع يقرأ",
      text: "نلتقي بانتظام في جلسات قراءة ومناقشات أدبية تجمع بين أجيال مختلفة من القراء.",
    },
  ];
  return (
    <section className="py-24 mx-auto max-w-6xl px-6">
      <div className="max-w-2xl mb-12">
        <p className="text-secondary font-medium text-sm tracking-wide mb-2">فلسفتنا</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">
          نزرع عادة القراءة كما تُزرع الأشجار
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl bg-card border border-border/60 p-7 shadow-soft hover:shadow-elegant transition"
          >
            <div className="h-12 w-12 rounded-t-full bg-gradient-warm flex items-center justify-center mb-5">
              <it.icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-display text-xl text-primary mb-2">{it.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{it.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-warm p-10 md:p-16 text-center shadow-elegant">
        <div className="absolute inset-x-12 top-0 h-32 rounded-b-full bg-white/10" />
        <h2 className="relative font-display text-3xl md:text-5xl text-white font-bold">
          مقعدك في انتظارك
        </h2>
        <p className="relative mt-4 text-white/95 max-w-xl mx-auto">
          احجز الآن واستمتع بفترة قراءة هادئة في أجواء دافئة.
        </p>
        <Link
          to="/booking"
          className="relative inline-flex mt-8 items-center gap-2 rounded-full bg-background px-8 py-4 text-primary font-semibold shadow-soft hover:bg-card transition"
        >
          احجز تذكرتك الآن
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}