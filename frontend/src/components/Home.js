import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '85vh' }}>
      <div className="card shadow-lg border-0 card-welcome p-5 text-center" style={{ maxWidth: '550px', width: '100%', borderRadius: '8px' }}>
        <h2 className="fw-bold mb-3" style={{ color: 'var(--gmu-green)' }}>
          Welcome to Student<br />Survey Portal
        </h2>
        <p className="text-muted mb-4 fs-6">
          Please participate in our student research by filling out the form below.
        </p>
        <div className="d-grid gap-3 mt-2">
          <Link to="/survey" className="btn btn-mason-gold py-2 fw-bold rounded-2 shadow-sm">
            START SURVEY
          </Link>
          <Link to="/surveys" className="btn btn-outline-secondary py-2 rounded-2 shadow-sm text-dark">
            View Past Results
          </Link>
        </div>
      </div>
    </div>
  );
}