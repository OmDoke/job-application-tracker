import React, { useEffect, useState } from 'react';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({ company: '', position: '', status: '', date: '' });
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const navigate = useNavigate();

  const fetchApplications = async () => {
    const res = await axios.get(`/jobs/${user.id}`);
    setApplications(res.data);
  };

  const addJob = async () => {
    await axios.post('/jobs', { ...form, userId: user.id });
    setForm({ company: '', position: '', status: '', date: '' });
    fetchApplications();
  };

  const deleteJob = async (id) => {
    await axios.delete(`/jobs/${id}`);
    fetchApplications();
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="form-container">
      <h2>Hi, {user.name}</h2>
      <input placeholder="Company" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
      <input placeholder="Position" value={form.position} onChange={e => setForm({...form, position: e.target.value})} />
      <input placeholder="Status" value={form.status} onChange={e => setForm({...form, status: e.target.value})} />
      <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
      <button onClick={addJob}>Add Job</button>

      <h3>Job Applications</h3>
      <table border="1">
        <thead>
          <tr><th>Company</th><th>Position</th><th>Status</th><th>Date</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td>{app.company}</td>
              <td>{app.position}</td>
              <td>{app.status}</td>
              <td>{app.date}</td>
              <td>
                <button onClick={() => navigate(`/edit/${app.id}`)}>Edit</button>
                <button onClick={() => deleteJob(app.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
