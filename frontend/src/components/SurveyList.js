import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SurveyList() {
  const [surveys, setSurveys] = useState([]);

  const fetchSurveys = () => {
    // Fetch all records from backend port 30081
    axios.get('http://52.86.110.98:30081/api/surveys')
      .then(res => setSurveys(res.data))
      .catch(err => console.error("Error fetching surveys:", err));
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this survey record?")) {
      // Delete record on backend port 30081
      axios.delete(`http://52.86.110.98:30081/api/surveys/${id}`)
        .then(() => {
          alert("Survey deleted successfully.");
          fetchSurveys();
        })
        .catch(err => alert("Error deleting survey: " + err.message));
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success fw-bold">Submitted Surveys (CRUD Portal)</h2>
        <Link to="/survey" className="btn btn-success fw-bold shadow">Add New Survey</Link>
      </div>

      {surveys.length === 0 ? (
        <div className="alert alert-info text-center py-4">No surveys recorded yet. Submit one to see it here!</div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover table-bordered align-middle bg-white">
            <thead className="table-success">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>City, State</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {surveys.map(s => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.firstName} {s.lastName}</td>
                  <td>{s.email}</td>
                  <td>{s.city}, {s.state}</td>
                  <td>{s.date}</td>
                  <td>
                    <Link to={`/edit/${s.id}`} className="btn btn-sm btn-warning me-2 fw-bold">Edit</Link>
                    <button onClick={() => handleDelete(s.id)} className="btn btn-sm btn-danger fw-bold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-secondary">Back to Home</Link>
      </div>
    </div>
  );
}