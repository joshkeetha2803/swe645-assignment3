import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SurveyList() {
  const [surveys, setSurveys] = useState([]);

  const fetchSurveys = () => {
    axios.get('http://52.86.110.98:30081/api/surveys')
      .then(res => setSurveys(res.data))
      .catch(err => console.error("Error fetching surveys:", err));
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this survey record?")) {
      axios.delete(`http://52.86.110.98:30081/api/surveys/${id}`)
        .then(() => {
          alert("Survey deleted successfully.");
          fetchSurveys();
        })
        .catch(err => alert("Error deleting survey: " + err.message));
    }
  };

  return (
    <div className="container-fluid mt-5 px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: 'var(--gmu-green)' }}>All Survey Responses</h2>
        <Link to="/survey" className="btn btn-mason-green fw-bold shadow">Add New Survey</Link>
      </div>

      {surveys.length === 0 ? (
        <div className="alert alert-info text-center py-4">No surveys recorded yet. Submit one to see it here!</div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover table-bordered align-middle bg-white" style={{ fontSize: '0.9rem' }}>
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Street</th>
                <th>City</th>
                <th>State</th>
                <th>Zip</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Date</th>
                <th>Liked Most</th>
                <th>Interest</th>
                <th>Recommendation</th>
                <th>Comments</th>
                <th style={{ minWidth: '160px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {surveys.map(s => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.firstName}</td>
                  <td>{s.lastName}</td>
                  <td>{s.street}</td>
                  <td>{s.city}</td>
                  <td>{s.state}</td>
                  <td>{s.zip}</td>
                  <td>{s.phone}</td>
                  <td>{s.email}</td>
                  <td>{s.date}</td>
                  <td>{s.likedMost}</td>
                  <td>{s.interestSource}</td>
                  <td>{s.recommendationLikelihood}</td>
                  <td>{s.comments}</td>
                  <td>
                    <div className="d-flex flex-nowrap gap-2">
                      <Link to={`/edit/${s.id}`} className="btn btn-sm btn-mason-gold fw-bold">Update</Link>
                      <button onClick={() => handleDelete(s.id)} className="btn btn-sm btn-danger fw-bold">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="text-center mt-4 mb-5">
        <Link to="/" className="btn btn-primary">Back to Welcome</Link>
      </div>
    </div>
  );
}