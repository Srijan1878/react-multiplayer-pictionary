import './App.css';
import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import WithSuspense from './WithSuspense/WithSuspense';
import { AnimatePresence } from 'framer-motion';

//LazyLoaded Routes 
const Lobby = WithSuspense(lazy(() => import('./pages/Lobby')))

const GameScreen = WithSuspense(lazy(() => import('./pages/GameScreen/GameScreen')))

const WaitingLobby = WithSuspense(lazy(() => import('./pages/WaitingLobby')))

function App() {

const location = useLocation()

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Lobby /></Suspense>} />
        <Route path="/game" exact element={<Suspense fallback={<div>Loading...</div>}><GameScreen /></Suspense>} />
        <Route path="/waiting" element={<Suspense fallback={<div>Loading...</div>}><WaitingLobby /></Suspense>} />
      </Routes>
    </AnimatePresence>
  );
}
export default App;
