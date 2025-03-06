import Header from "../../components/Header"
import { Hero } from "./Hero"
import About from "./About"
import Features from "./Features"
import Team from "./Team"
import Footer from "./Footer"

const Home = () => {
  return (
    <div className="w-full max-w-[1600px] mx-auto">
        <Header />
        <div id="home">
          <Hero />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="team">
          <Team />
        </div>
        <Footer />
    </div>
  )
}

export default Home