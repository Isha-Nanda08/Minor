import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import "../styles/loginstudent.css"; // Make sure this CSS file is in the same directory

const LoginStudent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Check Firestore for valid student role
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("This email is not registered.");
        setLoading(false);
        return;
      }

      let userData = null;
      querySnapshot.forEach((doc) => {
        userData = doc.data();
      });

      if (!userData || userData.role !== "student") {
        setError("Unauthorized access. Only students can log in.");
        setLoading(false);
        return;
      }

      // Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem("userRole", userData.role);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="background-pattern"></div>
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
      <div className="shape shape-4"></div>
      
      <div className="login-container">
        <h1 className="login-title">Student Login</h1>
        
        {error && (
          <div className="error-message">
            <AlertCircle style={{ width: '16px', height: '16px', marginRight: '8px', display: 'inline-block', verticalAlign: 'text-bottom' }} />
            <span>{error}</span>
          </div>
        )}
        
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            className="form-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <input
            type="password"
            className="form-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 style={{ 
                  width: '16px', 
                  height: '16px', 
                  marginRight: '8px', 
                  display: 'inline-block', 
                  verticalAlign: 'text-bottom',
                  animation: 'spin 1s linear infinite'
                }} />
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginStudent;