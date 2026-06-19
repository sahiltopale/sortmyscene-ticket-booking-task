import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  async function register(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      alert("Registered");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-shell">
      <aside className="auth-hero">
        <div className="auth-brand">
          <div className="auth-brand-mark" />
          <span>Ticketly</span>
        </div>
        <div className="auth-hero-copy">
          <h1>Join the front row.</h1>
          <p>
            Create your account in seconds and start booking the best seats in
            the house.
          </p>
        </div>
        <div className="auth-hero-foot">
          © {new Date().getFullYear()} Ticketly. All rights reserved.
        </div>
      </aside>

      <section className="auth-panel">
        <div className="auth-card">
          <h2>Create account</h2>
          <p className="sub">It only takes a minute.</p>

          <form onSubmit={register}>
            <div className="field">
              <label>Full name</label>
              <input
                className="input"
                placeholder="Jane Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                className="input"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="field">
              <label>Password</label>
              <div className="input-wrap">
                <input
                  className="input"
                  type={showPw ? "text" : "password"}
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="toggle"
                  onClick={() => setShowPw((s) => !s)}
                >
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button className="btn btn-primary mt-2" disabled={loading}>
              {loading ? <span className="spinner" /> : "Create Account"}
            </button>
          </form>

          <p className="auth-foot">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Register;
