
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux_services/apiEndpoints";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./auth.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(form).unwrap();

      localStorage.setItem("token", res.token);

      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert(err.data?.msg || "Login failed");
    }
  };

  return (
    <Box className="auth-page">
      <Box className="auth-brand-panel">
        <Box className="auth-brand-content">
          <Box className="auth-logo">
            <span>CM</span>
          </Box>

          <Typography className="auth-brand-title">
            Contact Manager
          </Typography>

          <Typography className="auth-brand-description">
            One workspace for every important connection.
            Organize your contacts and keep your network
            accessible whenever you need it.
          </Typography>

          <Box className="auth-feature-list">
            <div>
              <span className="auth-feature-icon">✓</span>
              Organized contact directory
            </div>
            <div>
              <span className="auth-feature-icon">✓</span>
              Smart search and favourites
            </div>
            <div>
              <span className="auth-feature-icon">✓</span>
              Easy contact management
            </div>
          </Box>

          <Typography className="auth-brand-footer">
            Built to keep your connections organized.
          </Typography>
        </Box>
      </Box>

      <Box className="auth-form-panel">
        <Box className="auth-form-container">
          <Box className="auth-mobile-logo">
            <span className="auth-logo-small">CM</span>
            <Typography fontWeight={750}>
              Contact Manager
            </Typography>
          </Box>

          <Typography className="auth-eyebrow">
            WELCOME BACK
          </Typography>

          <Typography className="auth-title">
            Sign in to your account
          </Typography>

          <Typography className="auth-description">
            Enter your credentials to access your workspace.
          </Typography>

          <form onSubmit={handleSubmit} className="auth-form">
            <TextField
              name="email"
              label="Email address"
              placeholder="you@example.com"
              type="email"
              value={form.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              autoComplete="email"
              className="auth-field"
            />

            <TextField
              name="password"
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              autoComplete="current-password"
              className="auth-field"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        onClick={() =>
                          setShowPassword((prev) => !prev)
                        }
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              variant="contained"
              type="submit"
              disabled={isLoading}
              fullWidth
              className="auth-submit"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <Box className="auth-switch">
            <Typography component="span">
              Don't have an account?
            </Typography>{" "}
            <Link to="/register" className="auth-link">
              Create account
            </Link>
          </Box>

          <Typography className="auth-legal">
            Contact Manager · Your personal contact workspace
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
