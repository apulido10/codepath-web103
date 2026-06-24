import { Link, NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        🎵 Encore
      </Link>
      <div className="nav-links">
        <NavLink to="/" end>
          Venues
        </NavLink>
        <NavLink to="/events">All Events</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
