import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [surveys, setSurveys] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', street_address: '', city: '', state: '', 
    zip_code: '', telephone: '', email: '', survey_date: '', 
    liked_most: '', interest_source: '', recommendation: 'Likely'
  });

  // Fetch all surveys on load (Read)
  useEffect(() => {
    fetch('http://localhost:8000/surveys/')
      .then(res => res.json())
      .then(data => setSurveys(data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form (Create)
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/surveys/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(newSurvey => {
      alert("Survey Submitted!");
      setSurveys([...surveys, newSurvey]); // Update UI
    });
  };

  // Delete Survey (Delete)
  const handleDelete = (id) => {
    fetch(`http://localhost:8000/surveys/${id}`, { method: 'DELETE' })
      .then(() => setSurveys(surveys.filter(s => s.id !== id)));
  };

  return (
    <div className="container">
      <header className="header-banner">
        <h1>George Mason University</h1>
        <p>Prospective Student Survey</p>
      </header>

      <section className="card">
        <h2>Submit a Survey</h2>
        <form onSubmit={handleSubmit}>
          {/* Add all your input fields here similar to this one: */}
          <div className="form-group">
            <label>First Name: </label>
            <input type="text" name="first_name" className="form-control" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Last Name: </label>
            <input type="text" name="last_name" className="form-control" onChange={handleChange} required />
          </div>
          {/* Add other inputs (address, city, state, zip, phone, email, date) */}
          
          <button type="submit" className="gmu-btn">Submit</button>
        </form>
      </section>

      <section className="card" style={{marginTop: "20px"}}>
        <h2>Submitted Surveys</h2>
        <ul>
          {surveys.map(survey => (
            <li key={survey.id}>
              {survey.first_name} {survey.last_name} 
              <button onClick={() => handleDelete(survey.id)} style={{marginLeft:"10px", color:"red"}}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;