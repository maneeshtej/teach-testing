import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase"; // Ensure that your Supabase client is correctly set up
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passMatch, setPassMatch] = useState(true);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOnChange = (e, name) => {
    switch (name) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "repeat password":
        setRepeatPassword(e.target.value);
        break;
      case "phone":
        setPhone(e.target.value);
        break;
    }
  };

  useEffect(() => {
    if (password !== repeatPassword) {
      setPassMatch(false);
    } else {
      setPassMatch(true);
    }
  }, [password, repeatPassword]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setPassMatch(false);
      setLoading(false);
      return;
    }

    try {
      const { user, error } = await supabase.auth.signUp(
        {
          email,
          password,
        },
        {
          data: {
            name,
            phone,
          },
        }
      );

      if (error) {
        setError(error.message);
      } else {
        console.log("SignUp successful:", user);
        const { data, error: insetError } = await supabase
          .from("Teachers")
          .insert([
            {
              name,
              email,
              number: phone,
            },
          ]);
        if (!insetError) {
          navigate("/");
        } else {
          console.log(insetError);
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSignUp}>
        <h3>Name</h3>
        <input
          type="text"
          required
          placeholder="Name"
          onChange={(e) => handleOnChange(e, "name")}
        />
        <h3>Email</h3>
        <input
          type="email"
          required
          placeholder="Email"
          onChange={(e) => handleOnChange(e, "email")}
        />
        <h3>Password</h3>
        <input
          type="password"
          required
          placeholder="Password"
          onChange={(e) => handleOnChange(e, "password")}
        />
        <h3>Repeat Password</h3>
        <input
          type="password"
          required
          placeholder="Repeat Password"
          onChange={(e) => handleOnChange(e, "repeat password")}
        />
        {!passMatch && <p>Passwords do not match</p>}
        <h3>Phone</h3>
        <input
          type="text"
          required
          placeholder="Phone"
          onChange={(e) => handleOnChange(e, "phone")}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
        <input type="submit" value={loading ? "Signing Up..." : "Sign Up"} />
      </form>
    </>
  );
}

export default SignUp;
