import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getLocation } from "../services/api.js";
import EventCard from "../components/EventCard.jsx";

function LocationPage() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getLocation(id)
      .then(setLocation)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="status">Loading venue…</p>;
  if (error) return <p className="status status-error">{error}</p>;
  if (!location) return <p className="status">Venue not found.</p>;

  return (
    <article className="location-detail">
      <Link to="/" className="back-link">
        ← All venues
      </Link>

      <div
        className="location-banner"
        style={{ backgroundImage: `url(${location.image})` }}
      >
        <div className="location-banner-overlay">
          <span className="location-card-badge">{location.neighborhood}</span>
          <h1>{location.name}</h1>
          <p className="location-capacity">
            Capacity: {location.capacity?.toLocaleString()} · {location.events.length}{" "}
            event{location.events.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <p className="location-description">{location.description}</p>

      <h2 className="section-heading">Events at {location.name}</h2>

      {location.events.length === 0 ? (
        <p className="status">No events scheduled here yet.</p>
      ) : (
        <div className="event-list">
          {location.events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </article>
  );
}

export default LocationPage;
