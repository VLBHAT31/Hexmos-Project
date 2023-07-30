import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';
import Home from './Components/Home';
import PollDetail from './Components/PollDetail';
import Vote from './Components/Vote';
import CreatePoll from './Components/CreatePoll';
import { PollsProvider } from './Components/PollsContext';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Components/store';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/polldetail/:id" element={<PollDetail />} />
          <Route path="/vote/:id" element={<Vote />} />
          <Route path="/createpoll" element={<CreatePoll />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PollsProvider>
        <App />
      </PollsProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();