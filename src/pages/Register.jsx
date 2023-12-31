import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../style.scss"
import axios from "axios";
import { url } from '../urls';

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(url + "auth/register", inputs);
      navigate("/login");
    } catch (error) {
      setErr(error.response.data);
    }
  }

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form action="" method='POST'>
        <input required type="text" placeholder='username' name="username" onChange={handleChange}/>
        <input required type="email" placeholder='email' name="email" onChange={handleChange}/>
        <input required type="password" placeholder='password' name='password' onChange={handleChange}/>
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>Do you have an account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  )
}

export default Register