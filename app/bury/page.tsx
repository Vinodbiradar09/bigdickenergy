"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function BuryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setLoading(false);
      alert("Failed to bury project");
      return;
    }

    router.push("/graveyard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full bg-[#0d0d12] border border-white/10 rounded-3xl p-10 shadow-2xl"
      >
        <h1 className="text-4xl font-bold mb-4">Bury Your Startup</h1>

        <p className="text-gray-400 mb-10">
          This is not a pitch.
          <br />
          This is a goodbye.
        </p>

        <div className="space-y-6">
          <Input name="name" placeholder="Startup name *" required />

          <Textarea
            name="desc"
            placeholder="What was this startup about?"
            rows={2}
          />

          <Input name="cause" placeholder="Cause of death *" required />

          <Input
            name="age"
            placeholder="How long did it live? (e.g. 6 months)"
          />

          <Input name="commit" placeholder="Last commit hash" />

          <Input
            name="github"
            placeholder="GitHub repo (optional)"
            type="url"
          />

          <Input
            name="url"
            placeholder="Live URL (if it ever had one)"
            type="url"
          />

          <Textarea
            name="eulogy"
            placeholder="Write its eulogy (optional)"
            rows={4}
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="mt-10 w-full bg-gradient-to-r from-pink-500 to-violet-500 text-black font-semibold py-6 rounded-full transition-all hover:scale-[1.02]"
        >
          {loading ? "Lowering into the ground…" : "Bury It"}
        </Button>
      </form>
    </main>
  );
}
