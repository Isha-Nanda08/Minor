import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../firebase"; // Ensure Firebase is initialized
import { useNavigate } from "react-router-dom";
import '../styles/prlogin.css';

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
    <div className="login-page">
      <div className="background-pattern"></div>
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
      <div className="shape shape-4"></div>
      
      <div className="login-container">
        <h2 className="login-title">Login (PR/IR)</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="login-form" onSubmit={handleLogin}>
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;