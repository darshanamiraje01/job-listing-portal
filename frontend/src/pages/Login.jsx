import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();


  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token) navigate("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const res = await axios.post("http://localhost:5000/api/auth/login", form);
    localStorage.setItem("token", res.data.token);

    const profile = await axios.get("http://localhost:5000/api/auth/profile", 
      {headers: { Authorization: `Bearer ${res.data.token}` }, 
    });
      localStorage.setItem("user", JSON.stringify(profile.data));
    navigate("/");
    window.location.reload();
  } catch (err) {
    alert("Invalid email or password");
    console.log(err);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center">
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4">
      <h2 className="text-center text-2xl font-semibold">Login</h2>

      <input placeholder="Email" className="border p-2 rounded" onChange={e => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" className="border p-2 rounded" onChange={e => setForm({...form, password: e.target.value})} />
      <button className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700">Login</button>
    </form>
    </div>
  );
}