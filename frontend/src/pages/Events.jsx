import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Events() {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return events;
    return events.filter(
      (e) =>
        e.name?.toLowerCase().includes(q) || e.venue?.toLowerCase().includes(q),
    );
  }, [events, query]);

  const initial = user?.name?.[0]?.toUpperCase() || "U";

  return (
    <div>
      <nav className="nav">
        <div className="nav-left">
          <div className="nav-mark" />
          <span>Ticketly</span>
        </div>
        <div className="nav-right">
          <div className="nav-user">
            <div className="nav-avatar">{initial}</div>
            <span>Hi, {user?.name || "Guest"}</span>
          </div>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="page">
        <div className="page-head">
          <div>
            <h1>Discover events</h1>
            <p className="lead">
              Pick a show, choose your seats, and you're in.
            </p>
          </div>
          <div className="search">
            <span>🔎</span>
            <input
              placeholder="Search by event or venue..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="center-load">
            <div className="spinner" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty">No events match your search.</div>
        ) : (
          <div className="grid-events">
            {filtered.map((event) => (
              <article key={event._id} className="event-card">
                <div className="event-cover">
                  <span className="event-badge">Live</span>
                </div>
                <div className="event-body">
                  <h3>{event.name}</h3>
                  <div className="event-meta">
                    <span>📍 {event.venue}</span>
                    <span>🎫 {event.totalSeats} seats</span>
                    {event.date && (
                      <span>
                        🗓 {new Date(event.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <Link to={`/booking/${event._id}`} className="event-cta">
                    <button className="btn btn-primary">Book Now</button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
