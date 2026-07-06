import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, BookHeart, ListPlus, ChevronUp, Send } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "مجتمع القراء | مكتبة عُزلة" },
      { name: "description", content: "شارك آراءك، كتبك المفضلة، واقترح كتباً نوفرها في المكتبة." },
      { property: "og:title", content: "مجتمع القراء | مكتبة عُزلة" },
      { property: "og:description", content: "حائط مجتمع مكتبة عُزلة." },
    ],
  }),
  component: Community,
});

type Review = { id: string; name: string; text: string; createdAt: number };
type FavBook = { id: string; name: string; book: string; note: string; createdAt: number };
type Request = { id: string; name: string; book: string; votes: number; voters: string[] };

function useLS<T>(key: string, initial: T) {
  const [val, setVal] = useState<T>(initial);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setVal(JSON.parse(raw));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {}
  }, [key, val]);
  return [val, setVal] as const;
}

const uid = () => Math.random().toString(36).slice(2, 10);

function getVoterId() {
  if (typeof window === "undefined") return "anon";
  let id = localStorage.getItem("ghiras_voter");
  if (!id) {
    id = uid();
    localStorage.setItem("ghiras_voter", id);
  }
  return id;
}

function Community() {
  const [tab, setTab] = useState<"reviews" | "favs" | "requests">("reviews");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-secondary text-sm font-medium tracking-wide">حائط المجتمع</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mt-2">
            مجتمع قراء عُزلة
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            شاركونا تجاربكم، كتبكم المفضلة، واقترحوا ما تتمنون توفيره على رفوفنا.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <TabBtn active={tab === "reviews"} onClick={() => setTab("reviews")} icon={MessageCircle}>
            شاركونا رأيكم
          </TabBtn>
          <TabBtn active={tab === "favs"} onClick={() => setTab("favs")} icon={BookHeart}>
            كتب نالت إعجابي
          </TabBtn>
          <TabBtn active={tab === "requests"} onClick={() => setTab("requests")} icon={ListPlus}>
            كتب نتمنى توفيرها
          </TabBtn>
        </div>

        {tab === "reviews" && <ReviewsPanel />}
        {tab === "favs" && <FavsPanel />}
        {tab === "requests" && <RequestsPanel />}
      </section>
      <Footer />
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
  icon: Icon,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-primary text-primary-foreground shadow-soft"
          : "bg-card border border-border text-foreground/80 hover:bg-accent/30"
      }`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
}

function ReviewsPanel() {
  const [items, setItems] = useLS<Review[]>("ghiras_reviews", []);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const submit = () => {
    if (!name.trim() || !text.trim()) return;
    setItems([{ id: uid(), name: name.trim(), text: text.trim(), createdAt: Date.now() }, ...items]);
    setName("");
    setText("");
  };

  return (
    <div className="space-y-6">
      <FormCard>
        <input
          placeholder="اسمك"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-2xl bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <textarea
          placeholder="شاركنا رأيك في المكتبة..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full rounded-2xl bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <SubmitBtn onClick={submit}>نشر</SubmitBtn>
      </FormCard>

      <div className="grid md:grid-cols-2 gap-4">
        {items.length === 0 && <EmptyState text="لا توجد آراء بعد. كن أول من يشارك!" />}
        {items.map((r) => (
          <Card key={r.id}>
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-primary">{r.name}</p>
              <span className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleDateString("ar-EG")}</span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{r.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FavsPanel() {
  const [items, setItems] = useLS<FavBook[]>("ghiras_favs", []);
  const [name, setName] = useState("");
  const [book, setBook] = useState("");
  const [note, setNote] = useState("");

  const submit = () => {
    if (!name.trim() || !book.trim()) return;
    setItems([{ id: uid(), name: name.trim(), book: book.trim(), note: note.trim(), createdAt: Date.now() }, ...items]);
    setName(""); setBook(""); setNote("");
  };

  return (
    <div className="space-y-6">
      <FormCard>
        <div className="grid sm:grid-cols-2 gap-3">
          <input placeholder="اسمك" value={name} onChange={(e) => setName(e.target.value)}
            className="rounded-2xl bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary" />
          <input placeholder="اسم الكتاب" value={book} onChange={(e) => setBook(e.target.value)}
            className="rounded-2xl bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary" />
        </div>
        <textarea placeholder="لماذا أعجبك؟ (اختياري)" value={note} onChange={(e) => setNote(e.target.value)} rows={2}
          className="w-full rounded-2xl bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary" />
        <SubmitBtn onClick={submit}>أضف الكتاب</SubmitBtn>
      </FormCard>

      <div className="grid md:grid-cols-2 gap-4">
        {items.length === 0 && <EmptyState text="لا توجد كتب بعد. شاركنا كتابك المفضل!" />}
        {items.map((it) => (
          <Card key={it.id}>
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-t-full bg-gradient-warm shrink-0 flex items-center justify-center">
                <BookHeart className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-display text-lg text-primary">{it.book}</p>
                <p className="text-xs text-muted-foreground">رشّحه {it.name}</p>
                {it.note && <p className="mt-2 text-sm text-foreground/80">{it.note}</p>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function RequestsPanel() {
  const [items, setItems] = useLS<Request[]>("ghiras_requests", []);
  const [name, setName] = useState("");
  const [book, setBook] = useState("");
  const voterId = typeof window !== "undefined" ? getVoterId() : "anon";

  const submit = () => {
    if (!book.trim()) return;
    setItems([{ id: uid(), name: name.trim() || "قارئ", book: book.trim(), votes: 1, voters: [voterId] }, ...items]);
    setName(""); setBook("");
  };

  const toggleVote = (id: string) => {
    setItems(
      items.map((r) => {
        if (r.id !== id) return r;
        const voted = r.voters.includes(voterId);
        return voted
          ? { ...r, votes: r.votes - 1, voters: r.voters.filter((v) => v !== voterId) }
          : { ...r, votes: r.votes + 1, voters: [...r.voters, voterId] };
      }),
    );
  };

  const sorted = [...items].sort((a, b) => b.votes - a.votes);

  return (
    <div className="space-y-6">
      <FormCard>
        <div className="grid sm:grid-cols-2 gap-3">
          <input placeholder="اسمك (اختياري)" value={name} onChange={(e) => setName(e.target.value)}
            className="rounded-2xl bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary" />
          <input placeholder="اسم الكتاب الذي تتمنى توفيره" value={book} onChange={(e) => setBook(e.target.value)}
            className="rounded-2xl bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary" />
        </div>
        <SubmitBtn onClick={submit}>اقترح الكتاب</SubmitBtn>
      </FormCard>

      <div className="space-y-3">
        {sorted.length === 0 && <EmptyState text="لا توجد اقتراحات بعد." />}
        {sorted.map((r) => {
          const voted = r.voters.includes(voterId);
          return (
            <motion.div
              key={r.id}
              layout
              className="flex items-center gap-4 rounded-2xl bg-card border border-border/60 p-4 shadow-soft"
            >
              <button
                onClick={() => toggleVote(r.id)}
                className={`flex flex-col items-center justify-center h-14 w-14 rounded-2xl transition ${
                  voted
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-border text-primary hover:bg-accent/30"
                }`}
              >
                <ChevronUp className="h-4 w-4" />
                <span className="text-sm font-bold">{r.votes}</span>
              </button>
              <div className="flex-1">
                <p className="font-display text-lg text-primary">{r.book}</p>
                <p className="text-xs text-muted-foreground">اقترحه {r.name}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-card border border-border/60 p-6 shadow-soft space-y-3">
      {children}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-card border border-border/60 p-5 shadow-soft">{children}</div>;
}

function SubmitBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold shadow-soft hover:bg-secondary transition"
    >
      <Send className="h-4 w-4" /> {children}
    </button>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="md:col-span-2 text-center py-12 text-muted-foreground border border-dashed border-border rounded-3xl">
      {text}
    </div>
  );
}
