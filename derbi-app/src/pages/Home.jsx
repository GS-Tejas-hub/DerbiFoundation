
import SEO from '../components/SEO';
import { ExperienceHero } from '../components/ui/experience-hero';
import { ImpactStats } from '../components/ui/impact-stats';
import { DerbiStory } from '../components/ui/derbi-story';
import { DerbiTimeline } from '../components/ui/derbi-timeline';
import { FlagshipPrograms } from '../components/ui/flagship-programs';
import { OurOfferings } from '../components/ui/our-offerings';
import { FundingSchemes } from '../components/ui/funding-schemes';
import { OurStartupsSpeak } from '../components/ui/our-startups-speak';
import { ContactSection } from '../components/ui/contact-section';
import { Footer } from '../components/ui/footer';

const Home = () => {
  return (
    <div className="flex-grow w-full bg-pitch-black flex flex-col relative overflow-hidden">
      <SEO
        title="Home"
        description="Explore the Home page of Derbi Foundations, where innovation meets majestic design."
        keywords="home, derbi, startups, innovation"
      />

      <ExperienceHero />
      <ImpactStats />
      <DerbiStory />
      <DerbiTimeline />
      <FlagshipPrograms />
      <OurOfferings />
      <FundingSchemes />
      <OurStartupsSpeak />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;