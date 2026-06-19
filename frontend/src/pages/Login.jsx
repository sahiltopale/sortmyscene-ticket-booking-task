import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const DEMO = {
  email: "demo@ticketly.com",
  password: "Demo@123",
};

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const useDemo = () => setForm(DEMO);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/events");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      {/* LEFT — Brand / Demo panel */}
      <aside className="auth-brand">
        <div className="brand-top">
          <div className="brand-logo">
            <span className="brand-mark">🎟️</span>
            <span className="brand-name">Ticketly</span>
          </div>

          <h1 className="brand-headline">
            Book seats to the <span className="accent">moments</span> that
            matter.
          </h1>
          <p className="brand-sub">
            Live concerts, theatre, sports, and unforgettable experiences — all
            in one place.
          </p>
        </div>

        <div className="demo-card">
          <div className="demo-head">
            <span className="demo-pill">Demo Access</span>
            <span className="demo-meta">For reviewer / HR</span>
          </div>

          <div className="demo-row">
            <span className="demo-label">Email</span>
            <code>{DEMO.email}</code>
          </div>
          <div className="demo-row">
            <span className="demo-label">Password</span>
            <code>{DEMO.password}</code>
          </div>

          <button type="button" className="btn-ghost" onClick={useDemo}>
            Use Demo Credentials
          </button>
        </div>

        <p className="brand-foot">© {new Date().getFullYear()} Ticketly</p>
      </aside>

      {/* RIGHT — Form panel */}
      <main className="auth-main">
        <div className="auth-card">
          <header className="auth-head">
            <h2>Welcome back</h2>
            <p>Sign in to continue to your dashboard.</p>
          </header>

          {error && <div className="auth-alert">{error}</div>}

          <form onSubmit={login} className="auth-form" noValidate>
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </label>

            <label className="field">
              <span>Password</span>
              <div className="input-group">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="input-suffix"
                  onClick={() => setShowPw(!showPw)}
                >
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="auth-foot">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
