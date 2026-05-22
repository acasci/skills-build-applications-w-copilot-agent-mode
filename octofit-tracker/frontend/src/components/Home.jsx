function Home() {
  return (
    <div className="container mt-4">
      <div className="jumbotron bg-light p-5 rounded">
        <h1 className="display-4">🏃 OctoFit Tracker</h1>
        <p className="lead">
          Track your fitness journey, compete with your team, and achieve your goals!
        </p>
        <hr className="my-4" />
        <p>
          Welcome to OctoFit Tracker - a modern multi-tier application built with:
        </p>
        <ul>
          <li><strong>Presentation Tier:</strong> React 19 with Vite</li>
          <li><strong>Logic Tier:</strong> Node.js + Express + TypeScript</li>
          <li><strong>Data Tier:</strong> MongoDB with Mongoose</li>
        </ul>
        <p className="mt-4">
          Use the navigation above to explore users, teams, activities, workouts, and the leaderboard!
        </p>
      </div>
    </div>
  );
}

export default Home;
