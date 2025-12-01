import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img 
                src="/octofitapp-small.png" 
                alt="OctoFit Logo" 
                className="navbar-logo"
              />
              OctoFit Tracker
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workout Suggestions</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="container mt-5">
              <div className="text-center mb-5">
                <h1 className="display-4 mb-3">🐙 Welcome to OctoFit Tracker</h1>
                <p className="lead">Track your fitness activities, compete with teams, and get personalized workout suggestions.</p>
              </div>
              
              <div className="row g-4 mt-4">
                <div className="col-md-6 col-lg-4">
                  <div className="card h-100 text-center">
                    <div className="card-body d-flex flex-column">
                      <div className="mb-3">
                        <span className="display-4">👤</span>
                      </div>
                      <h5 className="card-title">User Profiles</h5>
                      <p className="card-text flex-grow-1">Browse and manage user profiles and accounts.</p>
                      <Link to="/users" className="btn btn-primary mt-auto">View Users</Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 col-lg-4">
                  <div className="card h-100 text-center">
                    <div className="card-body d-flex flex-column">
                      <div className="mb-3">
                        <span className="display-4">📊</span>
                      </div>
                      <h5 className="card-title">Track Activities</h5>
                      <p className="card-text flex-grow-1">Log your workouts and monitor your progress over time.</p>
                      <Link to="/activities" className="btn btn-primary mt-auto">View Activities</Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 col-lg-4">
                  <div className="card h-100 text-center">
                    <div className="card-body d-flex flex-column">
                      <div className="mb-3">
                        <span className="display-4">👥</span>
                      </div>
                      <h5 className="card-title">Join Teams</h5>
                      <p className="card-text flex-grow-1">Create or join teams and compete together.</p>
                      <Link to="/teams" className="btn btn-primary mt-auto">View Teams</Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 col-lg-4">
                  <div className="card h-100 text-center">
                    <div className="card-body d-flex flex-column">
                      <div className="mb-3">
                        <span className="display-4">🏆</span>
                      </div>
                      <h5 className="card-title">Leaderboard</h5>
                      <p className="card-text flex-grow-1">See how you rank against other users and teams.</p>
                      <Link to="/leaderboard" className="btn btn-success mt-auto">View Leaderboard</Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 col-lg-4">
                  <div className="card h-100 text-center">
                    <div className="card-body d-flex flex-column">
                      <div className="mb-3">
                        <span className="display-4">💪</span>
                      </div>
                      <h5 className="card-title">Workout Plans</h5>
                      <p className="card-text flex-grow-1">Get personalized workout suggestions tailored to your goals.</p>
                      <Link to="/workouts" className="btn btn-success mt-auto">View Workouts</Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 col-lg-4">
                  <div className="card h-100 text-center bg-light">
                    <div className="card-body d-flex flex-column justify-content-center">
                      <div className="mb-3">
                        <span className="display-4">🎯</span>
                      </div>
                      <h5 className="card-title">Your Fitness Journey</h5>
                      <p className="card-text">Start tracking your progress today and achieve your fitness goals!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
