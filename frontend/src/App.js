// Team Members: Joshitha Keetha (G01575681) & Bhuvitha Tummala (G01576792)
// Course: SWE 645
// Purpose: It is the main entry point of the React app that handles frontend routing.

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SurveyForm from './components/SurveyForm';
import SurveyList from './components/SurveyList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<SurveyForm />} />
        <Route path="/edit/:id" element={<SurveyForm />} />
        <Route path="/surveys" element={<SurveyList />} />
      </Routes>
    </Router>
  );
}

export default App;