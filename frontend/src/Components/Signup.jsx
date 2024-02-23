import React, { useState } from 'react'; //importing the usestate hook to use and manage states
import { useNavigate } from 'react-router-dom'; //importing usenavigate hook to navigate through pages
import axios from 'axios'; //importing axios

// Signup component definition
const Signup = () => {
  // Hook to enable navigation between pages
  const navigate = useNavigate();

  // State to manage form data 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_password: '',
  });
  // State to manage form errors
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    confirm_password: '',
  });

  // Function to handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to validate form input
  const validateForm = () => {
    const errors = {};
    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    // password validation
    if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    // matching the password and re entered password
    if (formData.password !== formData.confirm_password) {
      errors.confirm_password = 'Passwords do not match';
    }
    // setting the state of form errors
    setFormErrors(errors);

    return Object.values(errors).every((error) => error === '');
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    // upon successful form validation
    if (validateForm()) {
      try {
        // Sending a POST request to the server for user signup
        await axios.post('/signup', { email: email, password });
        
        // Navigating to the login page upon successful signup
        navigate('/login');
      } catch (error) {
        // Handling errors and displaying appropriate messages
        console.log('error', error);
        alert(error.response.data.message);
      }
    }
  };

  // Function to navigate to the login page
  const login = () => {
    navigate('/login');
  };

  // JSX rendering of the Signup component
  return (
    <div className='bg-img'>
      <form className="container" onSubmit={handleSubmit}>
        <h1>Signup</h1>

        {/* Input for email */}
        <label><b>Email</b></label>
        <input
          placeholder="Enter Email" 
          type='text'
          name='email'
          id='email_id'
          autoComplete='email'
          onChange={handleChange}
          error={!!formErrors.email}
          required
        />

        {/* Input for password */}
        <label><b>Password</b></label>
        <input 
          type="password"
          placeholder="Enter Password"
          name='password'
          autoComplete='password'
          onChange={handleChange}
          error={!!formErrors.password}
          required
        />

        {/* Input for confirming password */}
        <label><b>Confirm Password</b></label>
        <input 
          type="password"
          placeholder="Repeat Password"
          name='confirm_password'
          autoComplete='password'
          onChange={handleChange}
          error={!!formErrors.confirm_password}
          required
        />

        {/* Submit button */}
        <button className="btn" type='submit'>Signup</button>

        {/* Button to navigate to the login page */}
        <button className="btn" onClick={login}>Already a member? Sign in</button>
      </form>
    </div>
  );
};

// Exporting the Signup component
export default Signup;
