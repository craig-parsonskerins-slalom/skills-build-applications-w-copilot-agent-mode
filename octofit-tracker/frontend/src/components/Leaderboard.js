import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Leaderboard Component - API Endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard Component - Fetched Data:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard Component - Processed Data:', leaderboardData);
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Leaderboard Component - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-4">
      <div className="alert alert-info loading-message" role="alert">
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Loading leaderboard...
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <strong>Error:</strong> {error}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <h2 className="mb-3">🏆 Leaderboard</h2>
        <p className="text-muted">Compete with others and track your ranking</p>
      </div>
      
      {leaderboard.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <strong>No leaderboard data found.</strong> Start competing today!
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">User</th>
                <th scope="col">Total Activities</th>
                <th scope="col">Total Distance (km)</th>
                <th scope="col">Total Calories</th>
                <th scope="col">Total Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => {
                const rankBadge = index === 0 ? 'bg-warning text-dark' : index === 1 ? 'bg-secondary' : index === 2 ? 'bg-danger' : 'bg-light text-dark';
                return (
                  <tr key={entry.id || index}>
                    <td><span className={`badge ${rankBadge} fs-6`}>{index + 1}</span></td>
                    <td><strong>{entry.user_name || entry.user}</strong></td>
                    <td><span className="badge bg-info">{entry.total_activities}</span></td>
                    <td><span className="badge bg-primary">{entry.total_distance}</span></td>
                    <td><span className="badge bg-success">{entry.total_calories}</span></td>
                    <td>{entry.total_duration}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
