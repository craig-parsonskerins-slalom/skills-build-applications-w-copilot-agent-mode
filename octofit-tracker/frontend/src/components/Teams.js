import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Teams Component - API Endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams Component - Fetched Data:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Teams Component - Processed Data:', teamsData);
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Teams Component - Error fetching data:', error);
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
        Loading teams...
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
        <h2 className="mb-3">👥 Teams</h2>
        <p className="text-muted">Join or create teams to compete together</p>
      </div>
      
      {teams.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <strong>No teams found.</strong> Create your first team and start competing!
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Team Name</th>
                <th scope="col">Description</th>
                <th scope="col">Created</th>
              </tr>
            </thead>
            <tbody>
              {teams.map(team => (
                <tr key={team.id}>
                  <td><span className="badge bg-secondary">{team.id}</span></td>
                  <td><strong className="text-primary">{team.name}</strong></td>
                  <td>{team.description}</td>
                  <td><small className="text-muted">{new Date(team.created_at).toLocaleDateString()}</small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Teams;
