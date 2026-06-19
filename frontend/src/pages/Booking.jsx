import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);
  const [reserved, setReserved] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    load();
    const existingReservation = localStorage.getItem("reservationId");
    if (existingReservation) setReserved(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const expiry = localStorage.getItem("reservationExpiry");
      if (!expiry) return;
      const remain = Math.floor((new Date(expiry) - new Date()) / 1000);
      if (remain <= 0) {
        setTimeLeft(0);
        setReserved(false);
        localStorage.removeItem("reservationId");
        localStorage.removeItem("reservationExpiry");
        alert("Reservation expired");
      } else {
        setTimeLeft(remain);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  async function load() {
    try {
      const res = await api.get(`/events/${id}`);
      setSeats(res.data.seats);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function toggleSeat(seat) {
    if (seat.status !== "available") return;
    if (selected.includes(seat.seatNumber)) {
      setSelected(selected.filter((s) => s !== seat.seatNumber));
    } else {
      setSelected([...selected, seat.seatNumber]);
    }
  }

  async function reserve() {
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/bookings/reserve",
        { eventId: id, seatNumbers: selected },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      localStorage.setItem("reservationId", res.data.reservation._id);
      localStorage.setItem(
        "reservationExpiry",
        new Date(Date.now() + 10 * 60 * 1000),
      );
      setReserved(true);
      alert("Seats Reserved");
      load();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }

  async function confirm() {
    try {
      const token = localStorage.getItem("token");
      const reservationId = localStorage.getItem("reservationId");
      await api.post(
        "/bookings/bookings",
        { reservationId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("Booking Confirmed");
      localStorage.removeItem("reservationId");
      localStorage.removeItem("reservationExpiry");
      setReserved(false);
      setSelected([]);
      load();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  const initial = user?.name?.[0]?.toUpperCase() || "U";
  const mm = Math.floor(timeLeft / 60);
  const ss = String(timeLeft % 60).padStart(2, "0");

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
            <h1>Select your seats</h1>
            <p className="lead">
              Tap a seat to select. Reserved seats are held for 10 minutes.
            </p>
          </div>
        </div>

        <div className="booking-layout">
          <div className="panel">
            <div className="screen" />
            <div className="screen-label">Screen / Stage</div>

            {loading ? (
              <div className="center-load">
                <div className="spinner" />
              </div>
            ) : (
              <div className="seat-grid">
                {seats.map((seat) => {
                  const isSelected = selected.includes(seat.seatNumber);
                  const cls = [
                    "seat",
                    isSelected ? "is-selected" : "",
                    seat.status === "reserved" ? "is-reserved is-disabled" : "",
                    seat.status === "booked" ? "is-booked is-disabled" : "",
                  ].join(" ");
                  return (
                    <div
                      key={seat._id}
                      className={cls}
                      onClick={() => toggleSeat(seat)}
                    >
                      {seat.seatNumber}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="legend">
              <div className="legend-item">
                <span className="legend-swatch sw-avail" /> Available
              </div>
              <div className="legend-item">
                <span className="legend-swatch sw-sel" /> Selected
              </div>
              <div className="legend-item">
                <span className="legend-swatch sw-res" /> Reserved
              </div>
              <div className="legend-item">
                <span className="legend-swatch sw-bk" /> Booked
              </div>
            </div>
          </div>

          <aside className="panel summary">
            <h3>Booking Summary</h3>
            <div className="summary-row">
              <span>Seats selected</span>
              <strong>{selected.length}</strong>
            </div>
            <div
              className="summary-row"
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <span>Seat numbers</span>
              {selected.length === 0 ? (
                <em style={{ color: "var(--text-mute)" }}>None selected yet</em>
              ) : (
                <div className="chips">
                  {selected.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {reserved && timeLeft > 0 && (
              <div className="timer">
                <div>
                  <div className="t-label">Hold expires in</div>
                  <div className="t-value">
                    {mm}:{ss}
                  </div>
                </div>
                <div className="spinner" />
              </div>
            )}

            <div className="mt-2">
              {!reserved ? (
                <button
                  className="btn btn-primary"
                  onClick={reserve}
                  disabled={selected.length === 0}
                >
                  Reserve {selected.length > 0 ? `(${selected.length})` : ""}
                </button>
              ) : (
                <button className="btn btn-primary" onClick={confirm}>
                  Confirm Booking
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Booking;
