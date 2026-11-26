import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import ClientWork from './components/ClientWork.jsx'
import Credentials from './components/Credentials.jsx'
import WorkLocation from './components/WorkLocation.jsx'
import Contact from './components/Contact.jsx'
import TreeQRCode from './components/TreeQRCode.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <Stats />
        <Experience />
        <Skills />
        <Projects />
        <ClientWork />
        <Credentials />
        <WorkLocation />
        <Contact />
        <TreeQRCode />
      </main>
      <Footer />
    </>
  )
}
