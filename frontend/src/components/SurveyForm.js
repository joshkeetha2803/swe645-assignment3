import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function SurveyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const firstNameRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', street: '', city: '', state: '', zip: '', phone: '', email: '', date: '', likedMost: [], interestSource: '', recommendationLikelihood: '', comments: ''
  });

  useEffect(() => {
    if (firstNameRef.current) firstNameRef.current.focus();
    if (id) {
      axios.get(`http://52.86.110.98:30081/api/surveys/${id}`)
        .then(res => setFormData(res.data))
        .catch(err => console.error("Error loading survey:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      let updatedLiked = [...formData.likedMost];
      if (checked) updatedLiked.push(value);
      else updatedLiked = updatedLiked.filter(item => item !== value);
      setFormData({ ...formData, likedMost: updatedLiked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleClear = () => {
    setFormData({
      firstName: '', lastName: '', street: '', city: '', state: '', zip: '', phone: '', email: '', date: '', likedMost: [], interestSource: '', recommendationLikelihood: '', comments: ''
    });
  };

  const validateForm = () => {
    let errors = [];
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.firstName)) errors.push("First Name must contain letters only.");
    if (!nameRegex.test(formData.lastName)) errors.push("Last Name must contain letters only.");
    if (!formData.street.trim()) errors.push("Street Address is required.");
    if (!/^\d{5}$/.test(formData.zip)) errors.push("Zip code must be exactly 5 digits.");
    if (!formData.city.trim()) errors.push("City is required.");
    if (!/^[A-Za-z]{2}$/.test(formData.state)) errors.push("State must be exactly 2 letters.");
    if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phone)) errors.push("Telephone must be in XXX-XXX-XXXX format.");
    if (!/^[a-zA-Z0-9._%+-]+@gmu\.edu$/.test(formData.email)) errors.push("Email must be a valid @gmu.edu address.");
    if (!formData.date) errors.push("Date of Survey is required.");

    if (errors.length > 0) {
      alert("Validation Errors:\n\n" + errors.join("\n"));
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...formData,
      likedMost: Array.isArray(formData.likedMost) ? formData.likedMost.join(', ') : formData.likedMost
    };

    if (id) {
      axios.put(`http://52.86.110.98:30081/api/surveys/${id}`, payload)
        .then(() => { alert("Survey updated successfully!"); navigate('/surveys'); })
        .catch(err => alert("Error updating survey: " + err.message));
    } else {
      axios.post('http://52.86.110.98:30081/api/surveys', payload)
        .then(() => { alert("Survey submitted successfully!"); navigate('/surveys'); })
        .catch(err => alert("Error submitting survey: " + err.message));
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg border-0">
        <div className="card-header p-4 text-center" style={{ backgroundColor: 'var(--gmu-green)', borderBottom: '5px solid var(--gmu-yellow)' }}>
          <h2 className="mb-0 fw-bold" style={{ color: 'var(--gmu-yellow)' }}>
            {id ? 'Update Student Survey' : 'Student Survey Form'}
          </h2>
        </div>
        <div className="card-body p-4 bg-light">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">First Name <span className="text-danger">*</span></label>
              <input ref={firstNameRef} type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Last Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="col-12">
              <label className="form-label fw-bold">Street Address <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="street" value={formData.street} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Zip Code <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="zip" value={formData.zip} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">City <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">State <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} maxLength="2" required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Telephone Number (XXX-XXX-XXXX) <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="301-325-8058" required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Email (username@gmu.edu) <span className="text-danger">*</span></label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="jkeetha@gmu.edu" required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Date of Survey <span className="text-danger">*</span></label>
              <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div className="col-12 mt-4">
              <label className="form-label fw-bold d-block">What did you like most about the campus?</label>
              {['students', 'location', 'campus', 'atmosphere', 'dorm rooms', 'sports'].map(opt => (
                <div key={opt} className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name="likedMost" value={opt} checked={Array.isArray(formData.likedMost) ? formData.likedMost.includes(opt) : formData.likedMost.includes(opt)} onChange={handleChange} />
                  <label className="form-check-label text-capitalize">{opt}</label>
                </div>
              ))}
            </div>

            <div className="col-12 mt-3">
              <label className="form-label fw-bold d-block">How did you become interested in the university?</label>
              {['friends', 'television', 'Internet', 'other'].map(src => (
                <div key={src} className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="interestSource" value={src} checked={formData.interestSource === src} onChange={handleChange} />
                  <label className="form-check-label text-capitalize">{src}</label>
                </div>
              ))}
            </div>

            <div className="col-md-6 mt-3">
              <label className="form-label fw-bold">Likelihood of recommending this school:</label>
              <select className="form-select" name="recommendationLikelihood" value={formData.recommendationLikelihood} onChange={handleChange}>
                <option value="">Select likelihood...</option>
                <option value="Very Likely">Very Likely</option>
                <option value="Likely">Likely</option>
                <option value="Unlikely">Unlikely</option>
              </select>
            </div>

            <div className="col-12 mt-3">
              <label className="form-label fw-bold">Additional Comments:</label>
              <textarea className="form-control" name="comments" rows="3" value={formData.comments} onChange={handleChange}></textarea>
            </div>

            <div className="col-12 text-center mt-4 d-flex justify-content-center gap-3">
              <button type="submit" className="btn btn-mason-green btn-lg px-5 fw-bold shadow">
                {id ? 'Update Survey' : 'Submit Survey'}
              </button>
              <button type="button" onClick={handleClear} className="btn btn-secondary btn-lg px-4 fw-bold shadow">
                Clear Form
              </button>
              <Link to="/" className="btn btn-outline-danger btn-lg px-4 fw-bold shadow">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}