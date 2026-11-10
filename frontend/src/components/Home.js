import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="p-5 mb-4 bg-white rounded-3 shadow-lg border border-success">
        <div className="container-fluid py-3 text-center">
          <div className="p-4 mb-4 text-white rounded" style={{ backgroundColor: '#006633' }}>
            <h1 className="display-5 fw-bold">George Mason University</h1>
            <p className="col-md-8 fs-4 mx-auto text-warning">Prospective Student Survey & CRUD Portal</p>
          </div>
          
          <div className="card mb-4 shadow-sm border-0 bg-light">
            <div className="card-body">
              <h3 className="card-title text-success fw-bold mb-3">Team Members</h3>
              <ul className="list-group list-group-flush bg-transparent">
                <li className="list-group-item bg-transparent"><strong>Joshitha Keetha</strong> - G01575681</li>
                <li className="list-group-item bg-transparent"><strong>Bhuvitha Tummala</strong> - G01576792</li>
              </ul>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3">
            <Link to="/survey" className="btn btn-success btn-lg px-4 fw-bold shadow">
              Fill Out Survey Form
            </Link>
            <Link to="/surveys" className="btn btn-outline-success btn-lg px-4 fw-bold shadow">
              View & Manage Surveys (CRUD)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}