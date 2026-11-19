"use client";

import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import {
  DATABASE_OPTIONS,
  ONBOARDING_ENDPOINT,
  validateOnboardingRequest,
  type OnboardingRequestInput,
  type FieldErrors,
} from "@/lib/onboarding-request";
import { PRIVACY_POLICY_VERSION, SALES_EMAIL } from "@/lib/legal";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "h-11 w-full rounded-md border border-hairline-strong bg-white px-3 text-sm text-body-strong placeholder:text-muted-soft outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20";

const emptyForm: OnboardingRequestInput = {
  name: "",
  email: "",
  company: "",
  jobTitle: "",
  databases: [],
  message: "",
  consent: false,
};

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-body-strong">
        {label}
        {optional && <span className="ml-1 font-normal text-muted-text">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export default function OnboardingRequestForm() {
  const [form, setForm] = useState<OnboardingRequestInput>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set = <K extends keyof OnboardingRequestInput>(key: K, value: OnboardingRequestInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleDatabase = (db: string) =>
    set("databases", form.databases.includes(db) ? form.databases.filter((d) => d !== db) : [...form.databases, db]);

  const describe = (key: keyof OnboardingRequestInput) => (errors[key] ? `${key}-error` : undefined);

  async function onSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const found = validateOnboardingRequest(form);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("submitting");

    // `next dev` cannot run the PHP handler; simulate success locally.
    if (process.env.NODE_ENV !== "production") {
      console.info("[onboarding request: dev only, not sent]", form);
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
      return;
    }

    try {
      const res = await fetch(ONBOARDING_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          website: honeypot,
          elapsedMs: Date.now() - startedAt.current,
          policyVersion: PRIVACY_POLICY_VERSION,
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; errors?: FieldErrors } | null;
      if (res.ok && data?.ok) {
        setStatus("success");
        return;
      }
      if (data?.errors) setErrors(data.errors);
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-xl border border-border bg-white p-8 sm:p-10">
        <CheckCircle2 size={36} className="text-accent-emerald" aria-hidden />
        <h2 className="text-2xl font-bold tracking-[-0.5px] text-primary">Thank you. We have your request.</h2>
        <p className="text-base leading-relaxed text-body">
          Our team will reply by email to arrange your onboarding. If you do not hear from us, write to{" "}
          <a href={`mailto:${SALES_EMAIL}`} className="font-medium text-primary underline underline-offset-2">
            {SALES_EMAIL}
          </a>
          .
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex h-11 items-center rounded-md border border-primary px-6 text-sm font-semibold text-primary no-underline transition-colors hover:bg-surface-soft"
        >
          Back to the home page
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-xl border border-border bg-white p-6 sm:p-8"
    >
      <Field id="name" label="Full name" error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={100}
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={describe("name")}
          className={fieldClass}
        />
      </Field>

      <Field id="email" label="Work email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={describe("email")}
          className={fieldClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="company" label="Company" error={errors.company}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            maxLength={120}
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            aria-invalid={!!errors.company}
            aria-describedby={describe("company")}
            className={fieldClass}
          />
        </Field>
        <Field id="jobTitle" label="Job title" error={errors.jobTitle}>
          <input
            id="jobTitle"
            name="jobTitle"
            type="text"
            autoComplete="organization-title"
            required
            maxLength={100}
            value={form.jobTitle}
            onChange={(e) => set("jobTitle", e.target.value)}
            aria-invalid={!!errors.jobTitle}
            aria-describedby={describe("jobTitle")}
            className={fieldClass}
          />
        </Field>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-sm font-medium text-body-strong">
          Databases you use <span className="font-normal text-muted-text">(optional)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {DATABASE_OPTIONS.map((db) => {
            const checked = form.databases.includes(db);
            return (
              <label
                key={db}
                className={cn(
                  "flex h-10 cursor-pointer items-center gap-2 rounded-md border px-3 text-sm transition-colors has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/40",
                  checked
                    ? "border-primary bg-surface-soft font-medium text-primary"
                    : "border-hairline-strong bg-white text-body hover:border-primary"
                )}
              >
                <input
                  type="checkbox"
                  name="databases"
                  value={db}
                  checked={checked}
                  onChange={() => toggleDatabase(db)}
                  className="size-4 accent-primary"
                />
                {db}
              </label>
            );
          })}
        </div>
      </fieldset>

      <Field id="message" label="Anything we should know?" optional error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={describe("message")}
          className={cn(fieldClass, "h-auto resize-y py-2.5")}
        />
      </Field>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-body">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            checked={form.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={describe("consent")}
            className="mt-1 size-4 shrink-0 accent-primary"
          />
          <span>
            I agree that Datorix may use these details to contact me about my onboarding request, as described in the{" "}
            <Link href="/privacy/" target="_blank" className="font-medium text-primary underline underline-offset-2">
              Privacy Policy
            </Link>
            . Use of the Datorix software is governed by the{" "}
            <Link href="/eula/" target="_blank" className="font-medium text-primary underline underline-offset-2">
              EULA
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="text-xs text-destructive">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          We could not send your request. Please try again, or email us at{" "}
          <a href={`mailto:${SALES_EMAIL}`} className="font-medium underline">
            {SALES_EMAIL}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex h-11 items-center justify-center gap-2 rounded-md bg-cta px-6 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-cta-hover hover:shadow-md active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            Get started
            <ArrowRight size={16} aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
