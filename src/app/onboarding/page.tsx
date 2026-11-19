import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/layout";
import OnboardingRequestForm from "@/components/OnboardingRequestForm";

export const metadata: Metadata = {
  title: "Get started",
  description: "Tell us about your databases and we will get you started with Datorix.",
  alternates: { canonical: "/onboarding/" },
};

const steps = [
  { title: "Send your details", body: "Tell us who you are and which databases you run." },
  { title: "We reply by email", body: "Someone from our team writes to arrange a time that suits you." },
  { title: "See it on your own scenarios", body: "We walk through monitoring, protection, replication and backup." },
];

export default function OnboardingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background pt-28 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-6 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-text">Get started</p>
            <h1 className="text-[clamp(30px,4vw,44px)] font-bold leading-[1.1] tracking-[-1.5px] text-primary">
              See Datorix on your databases.
            </h1>
            <p className="max-w-[460px] text-lg leading-relaxed text-body">
              A few details are enough. We only use them to answer your request.
            </p>
            <ol className="mt-4 flex flex-col gap-5">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-body-strong">{step.title}</p>
                    <p className="text-sm leading-relaxed text-body">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-7">
            <OnboardingRequestForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
