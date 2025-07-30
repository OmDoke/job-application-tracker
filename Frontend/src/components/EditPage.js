import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/axios';

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ company: '', position: '', status: '', date: '' });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8888/api/companies/company/${id}`);
      setForm(res.data);
    };
    fetchData();
  }, [id]);

  const updateJob = async () => {
    await axios.put(`http://localhost:8888/api/companies/user/2/company/${id}`, form);
    navigate('/dashboard');
  };

  return (
    <div className="form-container">
      <h2>Edit Job Application</h2>
      <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
      <input value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} />
      <input value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} />
      <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
      <button onClick={updateJob}>Update</button>
    </div>
  );
}

export default EditPage;