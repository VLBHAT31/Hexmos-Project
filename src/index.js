import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import Home from './Components/Home';
import PollDetail from './Components/PollDetail';
import Vote from './Components/Vote';
import CreatePoll from './Components/CreatePoll';
import Layout from './Components/Layout';
import { PollsProvider } from './Components/PollsContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/polldetail/:id" element={<PollDetail />} />
          <Route path="/vote/:id" element={<Vote />} />
          <Route path="/createpoll" element={<CreatePoll />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <PollsProvider>
    <App />
  </PollsProvider>
);

reportWebVitals();
