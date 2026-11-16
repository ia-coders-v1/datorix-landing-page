import { Navbar, Footer } from "./layout";
import {
  Hero,
  Problem,
  FeatureSections,
  Roadmap,
  TechStrip,
  HowItWorks,
  Databases,
  UseCases,
  Stats,
  CallToAction,
} from "./sections";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <FeatureSections />
        <Roadmap />
        <HowItWorks />
        <Databases />
        <UseCases />
        <Stats />
        <TechStrip />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
