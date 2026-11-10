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