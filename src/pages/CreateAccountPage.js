import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function CreateAccountPage() {
  // Handle state for form input controllers
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle Firebase login errors
  const [error, setError] = useState("");

  // Navigating the valid user to the destination
  const navigate = useNavigate();

  // API call for Firebase user creation
  const createAccount = async () => {
    try {
      // Evaluate password match
      if (password !== confirmPassword) {
        setError("Password and confirm password do not match !");
        return;
      }

      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Create Account</h1>
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
      <input
        placeholder="Re-enter Your Password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        type="password"
      />
      <button type="submit" onClick={createAccount}>
        Create Account
      </button>

      <Link to="/login">Already have an account ? Log in here</Link>
    </>
  );
}

export default CreateAccountPage;
