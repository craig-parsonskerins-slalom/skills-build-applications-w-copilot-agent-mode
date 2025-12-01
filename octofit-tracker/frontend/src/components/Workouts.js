import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts Component - API Endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts Component - Fetched Data:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts Component - Processed Data:', workoutsData);
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Workouts Component - Error fetching data:', error);
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
        Loading workout suggestions...
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
        <h2 className="mb-3">💪 Workout Suggestions</h2>
        <p className="text-muted">Personalized workout plans to help you reach your fitness goals</p>
      </div>
      
      {workouts.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <strong>No workout suggestions found.</strong> Check back later for personalized recommendations!
        </div>
      ) : (
        <div className="row">
          {workouts.map(workout => {
            const difficultyColor = workout.difficulty === 'Easy' ? 'success' : workout.difficulty === 'Medium' ? 'warning' : 'danger';
            return (
              <div key={workout.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card workout-card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{workout.name}</h5>
                    <p className="card-text text-muted">{workout.description}</p>
                    <ul className="list-group list-group-flush mt-auto">
                      <li className="list-group-item">
                        <strong>Type:</strong> 
                        <span className="badge bg-primary ms-2">{workout.activity_type}</span>
                      </li>
                      <li className="list-group-item">
                        <strong>Duration:</strong> 
                        <span className="badge bg-info ms-2">{workout.duration} min</span>
                      </li>
                      <li className="list-group-item">
                        <strong>Difficulty:</strong> 
                        <span className={`badge bg-${difficultyColor} ms-2`}>{workout.difficulty}</span>
                      </li>
                      <li className="list-group-item">
                        <strong>Calories:</strong> 
                        <span className="badge bg-success ms-2">{workout.calories_estimate}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer bg-transparent border-0">
                    <button className="btn btn-primary w-100">Start Workout</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Workouts;
