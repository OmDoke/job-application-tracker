import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/axios';
import '../styles/EditPage.css';

function EditPage() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company: '',
    position: '',
    status: '',
    date: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8888/api/companies/company/${id}`);
      setForm(res.data);
    };
    fetchData();
  }, [id]);

  const updateJob = async () => {
    await axios.put(`http://localhost:8888/api/companies/user/${user.id}/company/${id}`, form);
    navigate('/dashboard');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Edit Job Application</h1>
      </div>
      <div className="edit-form">
        <input
          type="text"
          placeholder="Company Name"
          value={form.company}
          onChange={e => setForm({ ...form, company: e.target.value })}
        />
        <input
          type="text"
          placeholder="Position"
          value={form.position}
          onChange={e => setForm({ ...form, position: e.target.value })}
        />
        <input
          type="text"
          placeholder="Status"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        />
        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
        />
        <button className="btn" onClick={updateJob}>
          Update
        </button>
      </div>
    </div>
  );
}

export default EditPage;
