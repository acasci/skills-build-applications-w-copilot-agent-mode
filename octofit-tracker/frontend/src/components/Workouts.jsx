import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/workouts/`);
      if (!response.ok) throw new Error('Failed to fetch workouts');
      const data = await response.json();
      setWorkouts(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      default: return 'secondary';
    }
  };

  if (loading) return <div className="container mt-4"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-4">
      <h2>💪 Workouts</h2>
      <div className="row">
        {workouts.map((workout) => (
          <div key={workout._id} className="col-md-6 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <span className={`badge bg-${getDifficultyColor(workout.difficulty)} mb-2`}>
                  {workout.difficulty}
                </span>
                <p className="card-text">{workout.description}</p>
                <p className="text-muted mb-2">
                  <strong>Duration:</strong> {workout.estimatedDuration} min
                </p>
                <div className="mb-2">
                  <strong>Exercises:</strong>
                  <ul className="list-unstyled">
                    {workout.exercises?.map((exercise, idx) => (
                      <li key={idx}>• {exercise}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Target Muscles:</strong> {workout.targetMuscles?.join(', ') || 'N/A'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
