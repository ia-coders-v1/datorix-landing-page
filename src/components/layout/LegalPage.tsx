import { Navbar, Footer } from "@/components/layout";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="bg-background pt-28 pb-20 sm:pt-32 sm:pb-28">
        <article className="mx-auto max-w-[760px] px-6">
          <h1 className="text-[clamp(30px,4vw,44px)] font-bold leading-[1.1] tracking-[-1.5px] text-primary">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted-text">Last updated: {updated}</p>
          <div className="mt-10 flex flex-col gap-4 text-base leading-relaxed text-body [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-[-0.3px] [&_h2]:text-primary [&_li]:pl-1 [&_ul]:ml-5 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
