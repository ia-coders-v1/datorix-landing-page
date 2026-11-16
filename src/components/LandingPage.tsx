import { Navbar, Footer } from "./layout";
import {
  Hero,
  Problem,
  FeatureSections,
  Roadmap,
  TechStrip,
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
