// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axios';
import '../styles/Dashboard.css'; // External CSS file

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({ company: '', position: '', status: '', date: '' });
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const fetchApplications = async () => {
    try {
      if (!user.id) {
        navigate('/login');
        return;
      }
      const res = await axios.get(`http://localhost:8888/api/companies/${user.id}`);
      setApplications(res.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const addJob = async () => {
    try {
      if (!user.id) {
        navigate('/login');
        return;
      }
      await axios.post(`http://localhost:8888/api/companies/${user.id}`, {
        ...form,
        userId: user.id
      });
      setForm({ company: '', position: '', status: '', date: '' });
      fetchApplications();
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const deleteJob = async (id) => {
    try {
      if (!user.id) {
        navigate('/login');
        return;
      }
      await axios.delete(`http://localhost:8888/api/companies/${id}`);
      fetchApplications();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  useEffect(() => {
    if (!user.id) {
      navigate('/login');
    } else {
      fetchApplications();
    }
  }, [user.id, navigate]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1 className="dashboard-main-title">Dashboard</h1>

        <div className="add-job-section">
          <h2>Hi, {user.name || 'Guest'}! Add a New Job Application</h2>
          <input
            className="input-field"
            placeholder="Company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Position"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          />
          <input
            className="input-field"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <button onClick={addJob} className="add-job-button">Add Job</button>
        </div>

        <div className="table-wrapper">
          <table className="application-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Status</th>
                <th>Date Applied</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.company}</td>
                    <td>{app.position}</td>
                    <td>{app.status}</td>
                    <td>{formatDate(app.date)}</td>
                    <td className="actions-cell">
                      <span onClick={() => navigate(`/edit/${app.id}`)} className="action-link">Edit</span>
                      <span className="action-link">|</span>
                      <span onClick={() => deleteJob(app.id)} className="action-link delete-link">Delete</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '15px' }}>
                    No job applications found. Add one above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
