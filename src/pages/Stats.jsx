import { Link } from "react-router-dom";

const Stats = () => {
  return (
    <div className="layout-container background text-main">
      <main>
        <div className="sign-in-container">
          <Link to="/" className="back-link border-accent">
            &lt; Back to timer
          </Link>
          <h1>stats</h1>
        </div>
      </main>
    </div>
  );
};

export default Stats;
