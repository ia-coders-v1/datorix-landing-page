import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Databases from "@/components/sections/Databases";
import UseCases from "@/components/sections/UseCases";
import Stats from "@/components/sections/Stats";
import CallToAction from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <Databases />
        <UseCases />
        <Stats />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
