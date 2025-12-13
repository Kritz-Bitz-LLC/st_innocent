import Head from "next/head";
import {
  Navbar,
  HeroSection,
  WelcomeSection,
  FaqSection,
  ParishLifeSection,
  CalendarSection,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Saint Innocent Orthodox Church - Olmsted Falls, Ohio</title>
        <meta name="description" content="Welcome to Saint Innocent Orthodox Church in Olmsted Falls, Ohio. Join us for worship, fellowship, and spiritual growth in the Orthodox Christian tradition." />
        <meta property="og:title" content="Saint Innocent Orthodox Church - Olmsted Falls, Ohio" />
        <meta property="og:description" content="Welcome to Saint Innocent Orthodox Church in Olmsted Falls, Ohio. Join us for worship, fellowship, and spiritual growth in the Orthodox Christian tradition." />
        <link rel="canonical" href="https://saintinnocent.org/" />
      </Head>
      <Navbar />
      <HeroSection />
      <WelcomeSection />
      <FaqSection />
      <ParishLifeSection />
      <CalendarSection />
      <Footer />
    </>
  );
}
