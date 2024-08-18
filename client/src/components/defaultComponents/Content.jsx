import { useEffect } from "react";
import Hero from "./Hero"
import Services from "./Services"
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";

const Content = () => {
  useEffect(()=>{
    AOS.init({duration: "1300", once:true})
  }, [])
  return (
    <div className="overflow-x-hidden">
        <Hero/>
        <Services/>
        <About/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default Content