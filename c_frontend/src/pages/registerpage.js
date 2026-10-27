
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux_services/apiEndpoints";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./auth.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await register(form).unwrap();

      localStorage.setItem("token", res.token);
      alert(res.msg);
      navigate("/");
    } catch (err) {
      alert(err.data?.msg || "Error");
      console.log(err);
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
            A simpler way to manage your personal and
            professional relationships. Create your workspace
            and bring your important contacts together.
          </Typography>

          <Box className="auth-feature-list">
            <div>
              <span className="auth-feature-icon">✓</span>
              Keep contacts in one place
            </div>
            <div>
              <span className="auth-feature-icon">✓</span>
              Find people quickly
            </div>
            <div>
              <span className="auth-feature-icon">✓</span>
              Manage your network with ease
            </div>
          </Box>

          <Typography className="auth-brand-footer">
            Start building a more organized workspace.
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
            GET STARTED
          </Typography>

          <Typography className="auth-title">
            Create your account
          </Typography>

          <Typography className="auth-description">
            Fill in your details to set up your workspace.
          </Typography>

          <form onSubmit={handleSubmit} className="auth-form">
            <TextField
              name="name"
              label="Full name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              autoComplete="name"
              className="auth-field"
            />

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
              placeholder="Create a password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              autoComplete="new-password"
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
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <Box className="auth-switch">
            <Typography component="span">
              Already have an account?
            </Typography>{" "}
            <Link to="/login" className="auth-link">
              Sign in
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

export default Register;
