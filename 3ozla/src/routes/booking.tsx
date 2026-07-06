import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ArrowLeft, ArrowRight, Check, Printer, Download, Ticket } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "حجز تذكرة | مكتبة عُزلة" },
      { name: "description", content: "احجز مقعدك في مكتبة عُزلة بسهولة خلال خطوات بسيطة." },
      { property: "og:title", content: "حجز تذكرة | مكتبة عُزلة" },
      { property: "og:description", content: "احجز مقعدك في مكتبة عُزلة." },
    ],
  }),
  component: Booking,
});

type Shift = "morning" | "evening";
interface Form {
  date: string;
  shift: Shift | "";
  name: string;
  phone: string;
}

const todayStr = () => new Date().toISOString().split("T")[0];

function Booking() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>({ date: todayStr(), shift: "", name: "", phone: "" });
  const [ticketId] = useState(() => "GH-" + Math.random().toString(36).slice(2, 8).toUpperCase());

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const canNext =
    (step === 0 && form.date && form.shift) ||
    (step === 1 && form.name.trim().length > 1 && /^\d{8,}$/.test(form.phone.trim())) ||
    step === 2 ||
    step === 3;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-secondary text-sm font-medium tracking-wide">احجز مقعدك</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mt-2">
            تذكرة مكتبة عُزلة
          </h1>
        </div>

        <Stepper step={step} />

        <div className="mt-10 rounded-3xl bg-card border border-border/60 shadow-soft p-8 md:p-10 min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && <StepDate form={form} setForm={setForm} />}
              {step === 1 && <StepInfo form={form} setForm={setForm} />}
              {step === 2 && <StepSummary form={form} />}
              {step === 3 && <StepPayment onPaid={next} />}
              {step === 4 && <StepTicket form={form} ticketId={ticketId} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {step < 3 && (
          <div className="mt-6 flex justify-between">
            <button
              onClick={prev}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-5 py-3 text-sm font-medium text-primary disabled:opacity-30"
            >
              <ArrowRight className="h-4 w-4" /> السابق
            </button>
            <button
              onClick={next}
              disabled={!canNext}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-soft disabled:opacity-40 hover:bg-secondary transition"
            >
              التالي <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-secondary hover:underline">
              العودة للرئيسية
            </Link>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  const labels = ["الموعد", "البيانات", "الملخص", "الدفع", "التذكرة"];
  return (
    <div className="flex items-center justify-between gap-2">
      {labels.map((l, i) => (
        <div key={l} className="flex-1 flex items-center gap-2">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold shrink-0 transition ${
              i <= step
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground"
            }`}
          >
            {i < step ? <Check className="h-4 w-4" /> : i + 1}
          </div>
          {i < labels.length - 1 && (
            <div className={`h-px flex-1 ${i < step ? "bg-primary" : "bg-border"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function StepDate({ form, setForm }: { form: Form; setForm: (f: Form) => void }) {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl text-primary">اختر التاريخ والفترة</h2>
      <div>
        <label className="block text-sm font-medium mb-2">التاريخ</label>
        <input
          type="date"
          min={todayStr()}
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full rounded-2xl bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">الفترة</label>
        <div className="grid grid-cols-2 gap-4">
          {([
            { id: "evening", label: "الفترة المسائية", time: "4 م — 11 م", Icon: Moon },
          ] as const).map(({ id, label, time, Icon }) => (
            <button
              key={id}
              onClick={() => setForm({ ...form, shift: id })}
              className={`rounded-2xl border p-5 text-right transition ${
                form.shift === id
                  ? "border-primary bg-accent/30 shadow-soft"
                  : "border-border bg-background hover:border-secondary"
              }`}
            >
              <Icon className="h-6 w-6 text-secondary mb-3" />
              <p className="font-semibold text-primary">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">{time}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepInfo({ form, setForm }: { form: Form; setForm: (f: Form) => void }) {
  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl text-primary">بياناتك الشخصية</h2>
      <div>
        <label className="block text-sm font-medium mb-2">الاسم بالكامل</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="مثال: سيف الدين"
          className="w-full rounded-2xl bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="01XXXXXXXXX"
          className="w-full rounded-2xl bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>
    </div>
  );
}

function StepSummary({ form }: { form: Form }) {
  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl text-primary">ملخص الحجز</h2>
      <div className="rounded-2xl bg-background border border-border p-6 space-y-3 text-sm">
        <Row label="الاسم" value={form.name} />
        <Row label="رقم الهاتف" value={form.phone} />
        <Row label="التاريخ" value={form.date} />
        <Row label="الفترة" value={form.shift === "morning" ? "صباحية (10 ص — 3 م)" : "مسائية (4 م — 11 م)"} />
        <div className="border-t border-border pt-3 flex justify-between font-semibold text-primary">
          <span>الإجمالي</span>
          <span>35 ج.م</span>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-foreground/80">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function StepPayment({ onPaid }: { onPaid: () => void }) {
  const [processing, setProcessing] = useState(false);
  const pay = () => {
    setProcessing(true);
    setTimeout(onPaid, 1200);
  };
  return (
    <div className="text-center space-y-5 py-6">
      <h2 className="font-display text-2xl text-primary">إتمام الدفع</h2>
      <p className="text-muted-foreground">سيتم محاكاة الدفع لأغراض العرض.</p>
      <button
        onClick={pay}
        disabled={processing}
        className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 font-semibold shadow-elegant hover:bg-secondary transition disabled:opacity-60"
      >
        {processing ? "جاري المعالجة..." : "ادفع 35 ج.م الآن"}
      </button>
    </div>
  );
}

function StepTicket({ form, ticketId }: { form: Form; ticketId: string }) {
  const qrPattern = Array.from({ length: 144 }, (_, i) => {
    // deterministic pseudo-pattern based on ticketId
    const seed = ticketId.charCodeAt(i % ticketId.length) + i;
    return seed % 3 === 0;
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex h-14 w-14 rounded-full bg-accent/40 items-center justify-center mx-auto">
          <Check className="h-7 w-7 text-primary" />
        </div>
        <h2 className="font-display text-2xl text-primary mt-4">تم تأكيد حجزك!</h2>
        <p className="text-muted-foreground text-sm mt-1">احتفظ بهذه التذكرة وأظهرها عند الاستقبال.</p>
      </div>

      <div className="relative rounded-3xl bg-gradient-warm p-1 shadow-elegant">
        <div className="rounded-[1.4rem] bg-background p-6 grid sm:grid-cols-[1fr_auto] gap-6 items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-secondary text-xs font-semibold tracking-wider">
              <Ticket className="h-4 w-4" /> تذكرة دخول
            </div>
            <p className="font-display text-2xl text-primary">{form.name}</p>
            <div className="grid grid-cols-2 gap-2 text-sm mt-3">
              <div>
                <p className="text-muted-foreground text-xs">التاريخ</p>
                <p className="font-medium">{form.date}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">الفترة</p>
                <p className="font-medium">{form.shift === "morning" ? "صباحية" : "مسائية"}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">الرقم</p>
                <p className="font-medium">{ticketId}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">الهاتف</p>
                <p className="font-medium">{form.phone}</p>
              </div>
            </div>
          </div>
          <div className="bg-primary p-3 rounded-2xl">
            <div className="grid grid-cols-12 gap-[2px] w-32 h-32">
              {qrPattern.map((on, i) => (
                <div key={i} className={on ? "bg-primary-foreground" : "bg-primary"} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3 print:hidden">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-5 py-3 text-sm font-medium hover:bg-accent/30 transition"
        >
          <Printer className="h-4 w-4" /> طباعة
        </button>
        <button
          onClick={() => {
            const blob = new Blob(
              [
                `تذكرة مكتبة عُزلة\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nالتاريخ: ${form.date}\nالفترة: ${form.shift}\nرقم التذكرة: ${ticketId}`,
              ],
              { type: "text/plain;charset=utf-8" },
            );
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `ghiras-ticket-${ticketId}.txt`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold shadow-soft hover:bg-secondary transition"
        >
          <Download className="h-4 w-4" /> تحميل
        </button>
      </div>
    </div>
  );
}
