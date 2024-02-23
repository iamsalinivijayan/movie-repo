import axios from 'axios'; //importing axios
import React, { useContext, useState } from 'react'; //importing usestate hook to use and manage states 
import { useNavigate } from 'react-router-dom'; //importing usenavigate to navigate through pages
import UserContext from '../Context/userContext';

// Login component definition
const Login = () => {
  // Hook to enable navigation between pages
  const navigate = useNavigate();

  // state to manage user using context api
  const { user, setUser } = useContext(UserContext);

  // State to manage form data 
  const [data, setData] = useState({
    email: '',
    password: '',
  });
 // state to manage form errors
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  // Function to handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // Function to validate form input
  const validateForm = () => {
    const errors = {};
    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = 'Invalid email address';
    }
    // password validation
    if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    // setting the state of errors
    setFormErrors(errors);

    return Object.values(errors).every((error) => error === '');
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // upon successful validation
    if (validateForm()) {
      try {
        console.log("User Context", user)
        // Sending a POST request to the server for login
        const response = await axios.post('/login', {
          email: data.email,
          password: data.password},{withCredentials: true});

        // Logging response and navigating to the home page upon successful login
        if (response.status === 200) {
        setUser({user: true});
        console.log("User context after",user)
        console.log('Response:', response)
        // navigating to customer dashboard
        if(response.data.isAdmin) {
          navigate('/admin/dashboard')
        } else{
          navigate('/dashboard');
        }
        }
        
      } catch (error) {
        // Handling errors and displaying appropriate messages
        if (error.response && error.response.status) {
          alert(`Error ${error.response.status}: ${error.response.data.message}`);
        } else {
          console.log('error', error);
          alert('An unexpected error occurred');
        }
      }
    }
  };

  // JSX rendering of the Login component
  return (
    <div className='bg-img'>
      <form className="container" onSubmit={handleSubmit}>
        <h1>Login</h1>

        {/* Input for email */}
        <label><b>Email</b></label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          onChange={handleChange}
          error={!!formErrors.email}
          autoComplete='email'
          required
        />

        {/* Input for password */}
        <label><b>Password</b></label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"  
          onChange={handleChange}
          error={!!formErrors.password}
          autoComplete='password'
          required
        />

        {/* Submit button */}
        <button 
          type="submit" 
          className="btn" 
        >
          Login
        </button>
      </form>
    </div>
  );
}

// Exporting the Login component
export default Login;
