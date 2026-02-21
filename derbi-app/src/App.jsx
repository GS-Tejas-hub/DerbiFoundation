import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
// import { CursorGlow } from './components/ui/cursor-glow';

// Page Imports
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import PrayasShalaLab from './pages/PrayasShalaLab';
import Partners from './pages/Partners';
import CurrentPrograms from './pages/CurrentPrograms';

// About Imports
import AboutUs from './pages/about/AboutUs';
import DirectorsMessage from './pages/about/DirectorsMessage';
import GoverningCouncil from './pages/about/GoverningCouncil';
import Team from './pages/about/Team';
import Mentors from './pages/about/Mentors';

// Programs Imports
import Pace from './pages/programs/Pace';
import Gallop from './pages/programs/Gallop';
import Emerge from './pages/programs/Emerge';
import Bionest from './pages/programs/Bionest';

// Funding Imports
import NidhiEir from './pages/funding/NidhiEir';
import NidhiPrayas from './pages/funding/NidhiPrayas';
import MeityTide from './pages/funding/MeityTide';
import NidhiSss from './pages/funding/NidhiSss';
import Sisfs from './pages/funding/Sisfs';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Prevent scrolling when the splash screen is overlaying the page
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showSplash]);

  return (
    <HelmetProvider>
      <Router>
        <div className="font-sans min-h-screen flex flex-col bg-pitch-black selection:bg-royal-gold/30 selection:text-royal-gold-light">
          {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
          {/* <CursorGlow /> */}

          <Navbar />
          <main className="flex-grow flex flex-col">
            <Routes>
              {/* All routes map directly to their Majestic pages */}
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/prayas-shala-lab" element={<PrayasShalaLab />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/current-programs" element={<CurrentPrograms />} />

              {/* About Pages */}
              <Route path="/about/about-us" element={<AboutUs />} />
              <Route path="/about/directors-message" element={<DirectorsMessage />} />
              <Route path="/about/governing-council" element={<GoverningCouncil />} />
              <Route path="/about/team" element={<Team />} />
              <Route path="/about/mentors" element={<Mentors />} />

              {/* Programs Pages */}
              <Route path="/programs/pace" element={<Pace />} />
              <Route path="/programs/gallop" element={<Gallop />} />
              <Route path="/programs/emerge" element={<Emerge />} />
              <Route path="/programs/bionest" element={<Bionest />} />

              {/* Funding Pages */}
              <Route path="/funding/nidhi-eir" element={<NidhiEir />} />
              <Route path="/funding/nidhi-prayas" element={<NidhiPrayas />} />
              <Route path="/funding/meity-tide" element={<MeityTide />} />
              <Route path="/funding/nidhi-sss" element={<NidhiSss />} />
              <Route path="/funding/sisfs" element={<Sisfs />} />
            </Routes>
          </main>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
