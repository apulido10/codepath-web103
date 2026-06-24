import { useEffect, useState } from "react";
import { getLocations } from "../services/api.js";
import LocationCard from "../components/LocationCard.jsx";

function HomePage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLocations()
      .then(setLocations)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <header className="hero">
        <h1>Live Music, Around the City</h1>
        <p>
          Pick a venue to see what's playing. From intimate lounges to riverside
          amphitheaters — your next show is one click away.
        </p>
      </header>

      {loading && <p className="status">Loading venues…</p>}
      {error && <p className="status status-error">{error}</p>}

      <section className="location-grid">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </section>
    </>
  );
}

export default HomePage;
