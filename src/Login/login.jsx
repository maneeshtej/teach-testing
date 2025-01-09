import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cookie = Cookies.get("auth_token");

  useEffect(() => {
    if (cookie) {
      navigate("/home");
    }
  });

  const handleSubmit = async (login) => {
    login.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data && data.session) {
        const { session } = data;

        Cookies.set("auth_token", session.access_token, {
          expires: 1,
          path: "/",
          secure: false,
        });

        Cookies.set("email", data.user.email, {
          expires: 1,
          path: "/",
          secure: false,
        });

        const { error } = await supabase
          .from("Teachers")
          .update({ Lastlogin: new Date().toISOString() })
          .eq("email", email);

        console.log(error);

        navigate("/home");
      } else {
        setError("No session returned.");
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.log("Error:", err.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-label">Email</h1>
        <input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <h1 className="login-label">Password</h1>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="submit"
          value={loading ? "Logging in..." : "Submit"}
          disabled={loading}
        />
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Link className="sign-up" to={"/signup"}>
        Sign Up
      </Link>
    </div>
  );
}

export default Login;
