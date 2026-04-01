import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux_services/apiEndpoints";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
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
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>

      <form onSubmit={handleSubmit} style={{display:"flex",gap:"10px",width:"600px",height:"400px",flexDirection:"column"}}>
      <h2>Register</h2>

        <TextField
          name="name"
          placeholder="Name"
          onChange={handleChange}
          size="small"
          variant="outlined"
        />

        <TextField
          name="email"
          placeholder="Email"
          onChange={handleChange}
          size="small"
          variant="outlined"
        />

        <TextField
          name="password"
          type="password"
          placeholder="Password"
          size="small"
          variant="outlined"
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </div>
  );
}

export default Register;
