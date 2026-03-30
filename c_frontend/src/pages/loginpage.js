import { useState } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../redux_services/apiEndpoints";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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
    } catch (err) {
      alert(err.data?.msg || "Login failed");
    }
  };

  return (
    <div style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} style={{display:"flex", gap:"10px" }}>
        <TextField
          name="email"
          placeholder="Email"
          onChange={handleChange}
          type="email"
          variant="outlined"
          size="small"
        />

        <TextField
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange} 
          variant="outlined"
           size="small" 
        />

        <Button variant="contained" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
      <p>don't have an account? <Link
          to={"/register"}
        >
          <Button type="submit" variant="contained" >CREATE ACCOUNT</Button>
        </Link></p>
    </div>
  );
}

export default Login;