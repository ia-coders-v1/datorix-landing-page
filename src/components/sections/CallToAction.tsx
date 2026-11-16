import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section id="cta" className="scroll-mt-20 bg-background py-16 sm:py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="rounded-xl px-8 py-16 text-center flex flex-col items-center gap-6 bg-primary">
          <p className="font-semibold uppercase tracking-[1.5px] text-xs text-muted-soft">Get started</p>

          <h2 className="font-bold text-[clamp(28px,3.5vw,40px)] tracking-[-1.5px] text-white max-w-[560px]">
            Run your databases with confidence.
          </h2>

          <p className="text-base text-muted-soft max-w-[440px]">
            One console for what your databases do, who touches them and where the data goes.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <a
              href="mailto:info@datorix.ai?subject=Datorix%20demo%20request"
              className="flex items-center justify-center gap-2 shrink-0 font-semibold h-11 px-6 rounded-md text-sm bg-accent-blue hover:bg-sky-500 text-primary transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
            >
              Request a demo
              <ArrowRight size={15} />
            </a>
            <a
              href="/docs/datorix_enterprise_datasheet_DAM.pdf"
              download
              className="flex items-center justify-center font-semibold h-11 px-6 rounded-md text-sm text-white border border-slate-600 hover:border-white transition-colors"
            >
              Download the datasheet
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
