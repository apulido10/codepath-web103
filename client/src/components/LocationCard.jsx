import { Link } from "react-router-dom";

// A clickable venue tile used on the home page. The whole card links to the
// venue's detail page, satisfying the "visual interface to select a location"
// requirement (it's a real image card, not just a text link).
function LocationCard({ location }) {
  return (
    <Link to={`/location/${location.id}`} className="location-card">
      <div
        className="location-card-image"
        style={{ backgroundImage: `url(${location.image})` }}
      >
        <span className="location-card-badge">{location.neighborhood}</span>
      </div>
      <div className="location-card-body">
        <h3>{location.name}</h3>
        <p>{location.description}</p>
        <span className="location-card-cta">View events →</span>
      </div>
    </Link>
  );
}

export default LocationCard;
