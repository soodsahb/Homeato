import AboutUs from "./components/layout/AboutUs";
import ContactUs from "./components/layout/ContactUs";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import HomeMenu from "./components/layout/HomeMenu";
import SectionHeaders from "./components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <HomeMenu></HomeMenu>
      <AboutUs></AboutUs>
      <ContactUs></ContactUs>
    </>
  );
}
