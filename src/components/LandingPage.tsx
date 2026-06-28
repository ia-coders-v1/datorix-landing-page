import { Navbar, Footer } from "./layout";
import {
  Hero,
  Problem,
  Features,
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
