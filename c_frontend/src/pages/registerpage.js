import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux_services/apiEndpoints";
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
      alert(res.msg);
      navigate("/home");
    } catch (err) {
      alert(err.data?.msg || "Error");
      console.log(err);
      
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;