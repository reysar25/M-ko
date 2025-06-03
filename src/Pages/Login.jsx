import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Components/firebase';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useOutletContext();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Login successful! Redirecting...", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      setTimeout(() => {
        navigate("/");
        setIsLoggedIn(true);

        
        
        
      }, 1000);
    } catch(error) {
      let errorMessage = "Login failed. Please check your credentials.";
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed login attempts. Please try again later.";
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = "Invalid login credentials. Please try again.";
      }
      
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      console.error(error);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg border border-gray-400 hover:scale-102 hover:shadow-2xl hover:shadow-gray-400">
      <h2 className="text-2xl font-bold mb-6 text-center text-darkText">Sign In</h2>
      <form className="space-y-6" onSubmit={handleLogin}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-darkText">Email Address</label>
          <input 
            type="email" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
            placeholder="Enter Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-darkText">Password</label>
          <input 
            type="password" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
            placeholder="Enter Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full cursor-pointer py-2 px-4 bg-blue-400 hover:bg-blue-700 text-black font-medium rounded-md transition duration-300"
        >
          Sign In
        </button>
        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
