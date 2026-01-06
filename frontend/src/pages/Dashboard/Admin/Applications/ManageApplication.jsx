import React, { useEffect, useState } from 'react';

const ManageApplication = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetch('/applications')
            .then(response => response.json())
            .then(data => setApplications(data))
            .catch(error => console.error('Error fetching applications:', error));
    }, []);

    const updateStatus = (id, status) => {
        fetch(`/applications/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            // Refresh applications or update the UI accordingly
            // For simplicity, we'll just log the message here
        })
        .catch(error => console.error('Error updating application status:', error));
    };

    return (
        <div>
            <h1>Manage applications</h1>
            {applications.map(app => (
                <div key={app._id} className="application">
                    <h2>{app.name}</h2>
                    <p>Email: {app.email}</p>
                    <p>Experience: {app.experience}</p>
                    <p>Status: {app.status}</p>
                    <button onClick={() => updateStatus(app._id, 'accepted')}>Accept</button>
                    <button onClick={() => updateStatus(app._id, 'rejected')}>Reject</button>
                </div>
            ))}
        </div>
    );
};

export default ManageApplication;
