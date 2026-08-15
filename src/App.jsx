import portfolio from "./data/portfolio.json";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import EducationSection from "./components/EducationSection";
import ExperienceSection from "./components/ExperienceSection";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Navbar from "./components/Navbar";
import ProjectSection from "./components/ProjectSection";
import SkillsSection from "./components/SkillsSection";
import projects from "./data/projects";
import useLenisScroll from "./hooks/useLenisScroll";

export default function App() {
  useLenisScroll();

  return (
    <main className="relative overflow-hidden bg-[linear-gradient(180deg,#f9faf9_0%,#ffffff_47%,#f9faf9_100%)] font-tomato-grotesk font-medium text-obsidian">
      <Navbar items={portfolio.navItems} />
      <Hero hero={portfolio.hero} />
      <Marquee items={portfolio.highlights} />
      <AboutSection about={portfolio.about} />
      <ProjectSection project={projects} />
      <ExperienceSection experiences={portfolio.experiences} />
      <SkillsSection intro={portfolio.skillsIntro} skills={portfolio.skills} />
      <EducationSection items={portfolio.education} />
      <ContactSection
        intro={portfolio.contactIntro}
        contacts={portfolio.contacts}
      />
    </main>
  );
}
