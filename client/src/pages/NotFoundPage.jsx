import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="status">
      <h1>404</h1>
      <p>That page hit a wrong note.</p>
      <Link to="/" className="back-link">
        ← Back to venues
      </Link>
    </div>
  );
}

export default NotFoundPage;
