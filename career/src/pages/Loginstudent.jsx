import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import "../styles/loginstudent.css"; // Make sure this CSS file is in the same directory

const LoginStudent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call your backend API for authentication
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // To enable cookies if using cookie-based auth
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

     

      // Store user info in localStorage (or better, in a context/state manager)
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("token", data.token);
      if (data.user.role === "student") {
        navigate("/dashboard");
      } else if (data.user.role === "PR") {
        navigate("/ir_prdash");
      } else {
        // Fallback for any other roles
        setError("Unknown user role");
        localStorage.clear();
        return;
      }
      
      // Redirect to dashboard
 
    } catch (error) {
      setError(error.message || "Invalid email or password. Please try again.");
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
        <h1 className="login-title">Login</h1>
        
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