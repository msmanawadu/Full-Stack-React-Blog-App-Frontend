import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {
  // Handle state for form input controllers
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Firebase login errors
  const [error, setError] = useState("");

  // Navigating the valid user to the destination
  const navigate = useNavigate();

  // API call for Firebase authentication
  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      {/* Conditional rendering of the login error */}
      {error && <p className="error">{error}</p>}

      <input
        placeholder="Your Email Address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        placeholder="Your Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
      />
      <button type="submit" onClick={logIn}>
        Log In
      </button>

      <Link to="/create-account">Don&apos;t have an account ? Create one here</Link>
    </>
  );
}

export default LoginPage;
