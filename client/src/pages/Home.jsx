
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import WhyChooseUs from "../components/WhyChooseUs";
import InstagramGallery from "../components/InstagramGallery";
import Footer from "../components/Footer";
import BestSellers from "../components/BestSellers";

export default function Home() {
  return (
    <>
      
      <Hero />
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs/>
      <BestSellers />
      <InstagramGallery/>
      <Testimonials/>
      <Newsletter/>
      <Footer/>
    </>
  );
}