// Team Members: Joshitha Keetha (G01575681) & Bhuvitha Tummala (G01576792)
// Course: SWE 645
// Purpose: It displays the welcome landing page with navigation links to the survey form and results.

import React from 'react';

// Import the Link component for routing between React pages
import { Link } from 'react-router-dom';

// Define and export the main Home landing page component
export default function Home() {
  return (

    // Create a centered, full-height container for the welcome card
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '85vh' }}>
      <div className="card shadow-lg border-0 card-welcome p-5 text-center" style={{ maxWidth: '550px', width: '100%', borderRadius: '8px' }}>
        <h2 className="fw-bold mb-3" style={{ color: 'var(--gmu-green)' }}>
          Welcome to Student<br />Survey Portal

          // Display the main welcome header using GMU green text
        </h2>
        <p className="text-muted mb-4 fs-6">
          Please participate in our student research by filling out the form below.
        </p>

        // Use a CSS grid layout to stack the navigation buttons cleanly
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