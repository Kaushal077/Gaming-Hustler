import React, { useState } from 'react';
import axios from 'axios';
const KEY = import.meta.env.VITE_IMG_TOKEN;

const LeaderboardForm = () => {
    const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
 const [leaderboardEntries, setLeaderboardEntries] = useState([
    { name: '', logo: '', points: '' },
    { name: '', logo: '', points: '' },
    { name: '', logo: '', points: '' },
    { name: '', logo: '', points: '' },
    { name: '', logo: '', points: '' },
 ]);

 const handleInputChange = (index, field, value) => {
    const updatedEntries = [...leaderboardEntries];
    updatedEntries[index][field] = value;
    setLeaderboardEntries(updatedEntries);
 };

 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/leaderboard', leaderboardEntries);
      console.log('Leaderboard entries saved successfully');
    } catch (error) {
      console.error('Failed to save leaderboard entries:', error);
    }
 };

 return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2.5em' }}>Leaderboard Entry Form</h1>
      <div style={{ border: '2px solid #007BFF', padding: '20px', margin: '20px', borderRadius: '10px', width: '80%' }}>
        <form onSubmit={handleSubmit}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Logo</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardEntries.map((entry, index) => (
                <tr key={index} style={{ backgroundColor: index < 3 ? ['#FFD700', '#C70039', '#ADFF2F'][index] : 'transparent' }}>
                 <td>{index + 1}</td>
                 <td>
                    <input
                      type="text"
                      value={entry.name}
                      onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                      style={{ borderRadius: '5px', padding: '5px', border: '1px solid #007BFF' }}
                    />
                 </td>
                 <td>
                    <input
                      type="text"
                      value={entry.logo}
                      onChange={(e) => handleInputChange(index, 'logo', e.target.value)}
                      style={{ borderRadius: '5px', padding: '5px', border: '1px solid #007BFF' }}
                    />
                 </td>
                 <td>
                    <input
                      type="number"
                      value={entry.points}
                      onChange={(e) => handleInputChange(index, 'points', e.target.value)}
                      style={{ borderRadius: '5px', padding: '5px', border: '1px solid #007BFF' }}
                    />
                 </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>Save Leaderboard Entries</button>
        </form>
      </div>
    </div>
 );
};

export default LeaderboardForm;
