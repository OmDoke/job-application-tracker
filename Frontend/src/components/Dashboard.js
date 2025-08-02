import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axios';

// Embedded CSS as a string
const dashboardStyles = `
    /* General Body and Page Styling */
    body {
        font-family: 'Inter', Arial, sans-serif; /* Using Inter font */
        background-color: #f0f2f5; /* Light grey background */
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: flex-start; /* Align to the top */
        min-height: 100vh;
        padding-top: 50px; /* Space from the top */
    }

    .dashboard-page {
        width: 90%; /* Increased from 50% for better content display */
        max-width: 1200px; /* Added max-width to prevent it from being too wide on large screens */
        display: flex;
        justify-content: center;
    }

    .dashboard-container {
        background-color: #ffffff;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 30px;
        width: 100%;
        max-width: 1000px; /* Limit width for better readability */
        box-sizing: border-box;
    }

    /* Dashboard Main Title */
    .dashboard-main-title {
        text-align: center;
        color: #333;
        font-size: 28px;
        margin-bottom: 30px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
    }

    /* Add Job Section */
    .add-job-section {
        margin-bottom: 40px;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        align-items: flex-end;
    }

    .add-job-section h2 {
        color: #555;
        margin-top: 0;
        margin-bottom: 20px;
        width: 100%;
    }

    .input-field {
        flex: 1 1 calc(33.33% - 15px);
        min-width: 180px;
        padding: 8px;
        margin-bottom: 0;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 16px;
        box-sizing: border-box;
    }

    .input-field:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }

    .add-job-button {
        background-color: #28a745;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;
        flex-shrink: 0;
        margin-top: auto;
    }

    .add-job-button:hover {
        background-color: #218838;
    }

    /* Table Styling */
    .table-wrapper {
        overflow-x: auto;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        border: 1px solid #e0e0e0;
    }

    .application-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 0;
        font-size: 15px;
    }

    .application-table thead {
        background-color: #343a40;
        color: white;
    }

    .application-table th,
    .application-table td {
        padding: 15px 12px;
        text-align: left;
        border-bottom: 1px solid #dee2e6;
    }

    .application-table th {
        font-weight: 600;
        text-transform: uppercase;
        white-space: nowrap;
    }

    .application-table tbody tr:nth-child(even) {
        background-color: #f8f9fa;
    }

    .application-table tbody tr:hover {
        background-color: #e2e6ea;
    }

    /* Actions Column */
    .actions-cell {
        white-space: nowrap;
    }

    .action-link {
        color: #007bff;
        cursor: pointer;
        text-decoration: none;
        margin-right: 10px;
        transition: color 0.2s ease;
    }

    .action-link:hover {
        color: #0056b3;
        text-decoration: underline;
    }

    .action-link.delete-link {
        color: #dc3545;
    }

    .action-link.delete-link:hover {
        color: #bd2130;
    }

    /* Link in URL column */
    .application-table td a {
        color: #007bff;
        text-decoration: none;
    }

    .application-table td a:hover {
        text-decoration: underline;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .dashboard-container {
            padding: 20px;
            width: 95%;
        }

        .add-job-section {
            gap: 10px;
        }

        .input-field {
            flex: 1 1 calc(50% - 10px);
            min-width: unset;
        }

        .add-job-button {
            width: 100%;
            margin-top: 10px;
        }

        .application-table th,
        .application-table td {
            padding: 8px 8px;
            font-size: 14px;
        }
    }

    @media (max-width: 480px) {
        .dashboard-main-title {
            font-size: 24px;
        }

        .add-job-section {
            gap: 8px;
        }

        .input-field {
            flex: 1 1 100%;
        }
    }
`;


function Dashboard() {
  // State to hold the list of job applications
  const [applications, setApplications] = useState([]);
  // State to manage the form input values for adding new applications
  const [form, setForm] = useState({ company: '', position: '', status: '', date: '' });
  // Retrieve user data from localStorage; this will now be your real user object
  const user = JSON.parse(localStorage.getItem('user')) || {};
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Effect to inject CSS into the document head when the component mounts
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = dashboardStyles;
    document.head.appendChild(styleElement);

    // Clean up the style tag when the component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []); // Empty dependency array ensures this runs only once on mount


  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const fetchApplications = async () => {
    try {
      if (!user.id) {
        console.warn("User ID not found, cannot fetch applications. Redirecting to login.");
        navigate('/login'); // Redirect to login if user not found
        return;
      }
      // Using your actual axios instance to fetch data from the backend
      const res = await axios.get(`http://localhost:8888/api/companies/${user.id}`);
      setApplications(res.data);
    } catch (error) {
      console.error("Error fetching applications:", error);

    }
  };

  const addJob = async () => {
    try {
      if (!user.id) {
        console.warn("User ID not found, cannot add job. Redirecting to login.");
        navigate('/login');
        return;
      }
      // Using your actual axios instance to post data to the backend
      await axios.post(`http://localhost:8888/api/companies/${user.id}`, { ...form, userId: user.id });
      // Reset form fields after successful submission
      setForm({ company: '', position: '', status: '', date: '' });
      fetchApplications(); // Re-fetch applications to display the newly added one
    } catch (error) {
      console.error("Error adding job:", error);
      // TODO: Implement user-friendly error message display
    }
  };

  const deleteJob = async (id) => {
    try {
      if (!user.id) {
        console.warn("User ID not found, cannot delete job. Redirecting to login.");
        navigate('/login');
        return;
      }
      // Using your actual axios instance to delete data from the backend
      await axios.delete(`http://localhost:8888/api/companies/${id}`);
      fetchApplications(); // Re-fetch applications after deletion
    } catch (error) {
      console.error("Error deleting job:", error);
      // TODO: Implement user-friendly error message display
    }
  };


  useEffect(() => {
    if (!user.id) {
      console.log("No user ID found, redirecting to login.");
      navigate('/login'); // Redirect to login page if user is not authenticated
    } else {
      fetchApplications(); // Fetch applications only if user is logged in
    }
  }, [user.id, navigate]); // Dependencies: re-run if user.id or navigate function changes

  return (
    // Main container for the dashboard page, styled with CSS classes
    // These classes are assumed to be provided by a separate CSS file (e.g., Dashboard.css)
    // or a CSS framework like Tailwind CSS in your project setup.
    <div className="dashboard-page">
      {/* Container for the main dashboard content, styled as a card */}
      <div className="dashboard-container">
        {/* Main title of the dashboard */}
        <h1 className="dashboard-main-title">Dashboard</h1>

        {/* Section for adding new job applications */}
        <div className="add-job-section">
          <h2>Hi, {user.name || 'Guest'}! Add a New Job Application</h2>
          {/* Input fields for company, position, status, date */}
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

          {/* Button to add the new job application */}
          <button
            onClick={addJob}
            className="add-job-button"
          >
            Add Job
          </button>
        </div>

        {/* Section for displaying job applications in a table */}
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
              {/* Conditionally render applications or a "no applications" message */}
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.company}</td>
                    <td>{app.position}</td>
                    <td>{app.status}</td>
                    <td>{formatDate(app.date)}</td>

                    <td className="actions-cell">
                      {/* Edit button, navigates to edit page */}
                      <span onClick={() => navigate(`/edit/${app.id}`)} className="action-link">Edit</span>
                      <span className="action-link">|</span> {/* Separator */}
                      {/* Delete button */}
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
