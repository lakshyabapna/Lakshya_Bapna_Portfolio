export interface RouteNavConfig {
  id: string;
  hash: string;
  label: string;
}

export const NAV_ROUTES: RouteNavConfig[] = [
  { id: 'home', hash: '#home', label: 'Home' },
  { id: 'the-player', hash: '#the-player', label: 'The Player' },
  { id: 'skills', hash: '#skills', label: 'Skills' },
  { id: 'starting-xi', hash: '#starting-xi', label: 'Starting XI' },
  { id: 'timeline', hash: '#timeline', label: 'Timeline' },
  { id: 'connect', hash: '#connect', label: 'Connect' }
];
