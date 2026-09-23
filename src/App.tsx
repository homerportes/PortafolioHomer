import './styles/global.css';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './features/hero/Hero';
import { Projects } from './features/projects/Projects';
import { Experience } from './features/experience/Experience';
import { Skills } from './features/skills/Skills';
import { Education } from './features/education/Education';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-to-content">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Education />
      </main>
      <Footer />
    </>
  );
}
