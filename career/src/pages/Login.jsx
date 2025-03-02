import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../firebase"; // Ensure Firebase is initialized
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Step 1: Check Firestore if the email exists and has a valid role
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("This email is not registered.");
        return;
      }

      let userData = null;
      querySnapshot.forEach((doc) => {
        userData = doc.data();
      });

      if (!userData || !userData.role || !["pr", "ir"].includes(userData.role)) {
        setError("Unauthorized access. Only PR/IR users can log in.");
        return;
      }

      // Step 2: Authenticate with Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem("userRole", userData.role); // Store role in local storage
      navigate("/pr-dashboard"); // Redirect to PR dashboard
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login (PR/IR)</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
