import { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
// import { auth, db } from '../Components/Firebase';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from "firebase/firestore";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const navigate = useNavigate();
  // const { setIsLoggedIn } = useOutletContext();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const loadingToast = toast.loading("Creating your account...", {
        position: "top-center",
        theme: "dark",
      });

      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      console.log(user.email, fName, lName);

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          firstName: fName,
          lastName: lName
        });

        toast.update(loadingToast, {
          render: "Registration successful! Redirecting...",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
        });

        setTimeout(() => {
          navigate("/");
          setIsLoggedIn(true);
        }, 2000);
      }
    } catch (error) {
      console.log(error);

      let errorMessage = "Registration failed. Please try again.";

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Email already in use. Please use a different email.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. Please use a stronger password.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address. Please enter a valid email.";
      }

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg border border-gray-400 hover:scale-102 hover:shadow-2xl hover:shadow-gray-400">
      {/* <ToastContainer /> */}
      <h2 className="text-2xl font-bold mb-6 text-center text-darkText">Register</h2>
      <form className="space-y-6" onSubmit={handleRegister}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-darkText">First Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Enter First Name"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-darkText">Last Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Enter Last Name"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-darkText">Email Address</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
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
          Sign Up
        </button>
        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
