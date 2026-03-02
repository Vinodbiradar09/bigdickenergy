"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "sonner";

const CAUSES = [
  "Scope Creep",
  "Lost Motivation",
  "Tutorial Hell",
  "Got a Job",
  "Too Many Features",
  "Imposter Syndrome",
  "Never Deployed",
  "Tech Debt",
  "Pivoted to Something Else",
  "Life Happened",
  "OpenAI API Bills",
  "Crypto Winter",
];

type Props = { open: boolean; onClose: () => void; onSuccess: () => void };

export default function SubmitModal({ open, onClose, onSuccess }: Props) {
  const [form, setForm] = useState({
    name: "",
    desc: "",
    cause: "",
    age: "",
    eulogy: "",
    commit: "",
    github: "",
    url: "",
  });
  const [loading, setLoading] = useState(false);

  function set(key: string, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function submit() {
    if (!form.name || !form.cause) {
      toast.error("Name and cause of death are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("⚰️ Project buried. May it rest in peace.");
        setForm({
          name: "",
          desc: "",
          cause: "",
          age: "",
          eulogy: "",
          commit: "",
          github: "",
          url: "",
        });
        onSuccess();
        onClose();
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = `w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(57,255,20,0.15)] text-[#e8dcc8] font-[family-name:var(--font-space-mono)] text-[13px] px-3 py-2.5 outline-none transition-all duration-200 focus:border-[#39ff14] focus:shadow-[0_0_0_1px_rgba(57,255,20,0.2)] placeholder:text-[rgba(232,220,200,0.2)]`;
  const labelClass = `block text-[10px] tracking-[3px] uppercase mb-2 text-[#39ff14]`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.88)",
            backdropFilter: "blur(10px)",
          }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="modal-border relative w-full max-w-lg bg-[#0a0a0a] border border-[rgba(57,255,20,0.15)] p-10 shadow-[0_0_80px_rgba(57,255,20,0.05)] overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-[rgba(255,32,32,0.3)] text-[#ff2020] hover:bg-[rgba(255,32,32,0.1)] transition-colors"
            >
              <X size={14} />
            </button>

            <h2
              className="text-3xl mb-1"
              style={{
                fontFamily: "var(--font-creepster)",
                color: "#ff2020",
                textShadow: "0 0 20px rgba(255,32,32,0.4)",
              }}
            >
              ⚰️ Last Rites
            </h2>
            <p
              className="text-[10px] tracking-[3px] uppercase mb-8"
              style={{ color: "rgba(232,220,200,0.3)" }}
            >
              Give your project a proper funeral
            </p>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Project Name *</label>
                <input
                  className={inputClass}
                  placeholder="MyAwesomeStartup"
                  maxLength={60}
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>
                  What was it supposed to be?
                </label>
                <input
                  className={inputClass}
                  placeholder="The Uber for dogs..."
                  maxLength={200}
                  value={form.desc}
                  onChange={(e) => set("desc", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Cause of Death *</label>
                  <select
                    className={inputClass}
                    value={form.cause}
                    onChange={(e) => set("cause", e.target.value)}
                    style={{ appearance: "none" }}
                  >
                    <option value="" style={{ background: "#111" }}>
                      Select...
                    </option>
                    {CAUSES.map((c) => (
                      <option key={c} value={c} style={{ background: "#111" }}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Time Alive</label>
                  <input
                    className={inputClass}
                    placeholder="3 weekends"
                    maxLength={30}
                    value={form.age}
                    onChange={(e) => set("age", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Eulogy</label>
                <textarea
                  className={`${inputClass} resize-none h-20`}
                  placeholder="It was going to change everything... after just one more feature."
                  maxLength={200}
                  value={form.eulogy}
                  onChange={(e) => set("eulogy", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Last Commit Message</label>
                <input
                  className={inputClass}
                  placeholder="fix: final fix (for real this time)"
                  maxLength={80}
                  value={form.commit}
                  onChange={(e) => set("commit", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>GitHub Link</label>
                  <input
                    className={inputClass}
                    placeholder="https://github.com/..."
                    type="url"
                    value={form.github}
                    onChange={(e) => set("github", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Live URL</label>
                  <input
                    className={inputClass}
                    placeholder="https://..."
                    type="url"
                    value={form.url}
                    onChange={(e) => set("url", e.target.value)}
                  />
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={submit}
                disabled={loading}
                className="w-full mt-2 py-4 text-[18px] tracking-[4px] border border-[#ff2020] text-[#ff2020] transition-all duration-200 hover:bg-[#ff2020] hover:text-white disabled:opacity-50"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {loading ? "BURYING..." : "☠️ BURY IT FOREVER"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
