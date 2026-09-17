import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StadiumAtmosphere } from './components/layout/StadiumAtmosphere';
import { MatchHUD } from './components/layout/MatchHUD';
import { HeroSection } from './components/hero/HeroSection';
import { ThePlayerPage } from './components/player/ThePlayerPage';
import { SkillsPage } from './components/skills/SkillsPage';
import { StartingXI } from './components/startingxi/StartingXI';
import { TimelinePage } from './components/timeline/TimelinePage';
import { ConnectPage } from './components/connect/ConnectPage';
import { MatchTransition } from './components/ui/MatchTransition';
import './App.css';

type RouteKey = 'home' | 'the-player' | 'skills' | 'starting-xi' | 'timeline' | 'connect';

const VALID_ROUTES: RouteKey[] = ['home', 'the-player', 'skills', 'starting-xi', 'timeline', 'connect'];

// Intro timing constants (ms from first paint):
//   INTRO_HERO_START_MS — hero content starts revealing underneath dissolving overlay
//   INTRO_UNMOUNT_MS    — overlay unmounts after CSS dissolve completes
const INTRO_HERO_START_MS = 5200;
const INTRO_UNMOUNT_MS   = 6000;

function getRouteFromHash(): RouteKey {
  const hash = window.location.hash.replace('#', '').trim();
  if (VALID_ROUTES.includes(hash as RouteKey)) {
    return hash as RouteKey;
  }
  return 'home';
}

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<RouteKey>(() => getRouteFromHash());

  const shouldShowIntro = (): boolean => {
    if (typeof window === 'undefined') return true;
    const hash = window.location.hash;
    if (hash && hash !== '#home') return false;
    return !sessionStorage.getItem('lb_stadium_intro_seen');
  };

  const [isKickoffActive, setIsKickoffActive] = useState<boolean>(shouldShowIntro);
  const [introMounted, setIntroMounted]       = useState<boolean>(shouldShowIntro);
  const introTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = getRouteFromHash();
      setCurrentRoute(newRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = useCallback((route: string) => {
    window.location.hash = `#${route}`;
  }, []);

  useEffect(() => {
    if (!introMounted) return;

    introTimersRef.current.forEach(clearTimeout);
    introTimersRef.current = [];

    const t1 = setTimeout(() => {
      setIsKickoffActive(false);
      sessionStorage.setItem('lb_stadium_intro_seen', 'true');
    }, INTRO_HERO_START_MS);

    const t2 = setTimeout(() => {
      setIntroMounted(false);
    }, INTRO_UNMOUNT_MS);

    introTimersRef.current = [t1, t2];

    return () => {
      introTimersRef.current.forEach(clearTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  const isHeroRoute = currentRoute === 'home'
    || currentRoute === 'the-player'
    || currentRoute === 'skills'
    || currentRoute === 'starting-xi'
    || currentRoute === 'timeline'
    || currentRoute === 'connect';

  return (
    <div className="lb-app-root">
      <StadiumAtmosphere activeRoute={currentRoute} />

      {introMounted && (
        <MatchTransition
          isOpen={introMounted}
          dissolveAt={INTRO_HERO_START_MS}
        />
      )}

      <MatchHUD
        activeRoute={currentRoute}
        onNavigate={navigateTo}
        isHeroActive={isHeroRoute}
      />

      <main
        id="main-content"
        className={[
          'lb-main-view',
          isHeroRoute ? 'lb-main-view--hero' : '',
        ].filter(Boolean).join(' ')}
        role="main"
      >
        {currentRoute === 'home' && (
          <HeroSection
            onExploreProjects={() => navigateTo('starting-xi')}
            isIntroActive={isKickoffActive}
          />
        )}

        {currentRoute === 'the-player' && (
          <ThePlayerPage
            onNavigateProjects={() => navigateTo('starting-xi')}
            onNavigateConnect={() => navigateTo('connect')}
          />
        )}

        {currentRoute === 'skills' && (
          <SkillsPage
            onNavigateProjects={() => navigateTo('starting-xi')}
          />
        )}

        {currentRoute === 'starting-xi' && (
          <StartingXI />
        )}

        {currentRoute === 'timeline' && (
          <TimelinePage
            onNavigateConnect={() => navigateTo('connect')}
          />
        )}

        {currentRoute === 'connect' && (
          <ConnectPage />
        )}
      </main>
    </div>
  );
};

export default App;
