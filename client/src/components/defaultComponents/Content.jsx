import { useEffect } from "react";
import Hero from "./Hero"
import Services from "./Services"
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import About from "./About";
import Contact from "./Contact";

const Content = () => {
  useEffect(()=>{
    AOS.init({duration: "1000"})
  }, [])
  return (
    <>
        <Hero/>
        <Services/>
        <About/>
        <Contact/>
    </>
  )
}

export default Content