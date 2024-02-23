// Importing necessary dependencies and components from react-router-dom
import { Route, Routes } from 'react-router-dom';

// Importing specific components for routing
import Signup from './Components/Signup';
import Login from './Components/Login';

// Importing the stylesheet for the App component
import './App.css';
// importing component dashboard from components
import Dashboard from './Components/Dashboard';
// importing element Movie from elements
import Movie from './Elements/Movie'

// importing Layout
import Layout from './Layout/Layout';
import Shows from './Components/Shows';
import Seats from './Components/Seats';
import Bookings from './Components/Bookings';
import Booking from './Components/Booking';
import AdminDashboard from './Components/AdminDashboard';
import AddMovie from './Components/AddMovie';
import AddShow from './Components/AddShow';
import EditMovie from './Components/EditMovie';
import ShowList from './Components/ShowList';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_AXIOS_BASE_URL
// Main App component definition
function App() {

  // JSX rendering of the App component
  return (
    <div className="App">
      {/* React Router 'Routes' component to define routes */}
      <Routes>
        {/* Route for the Signup component */}
        <Route index element={<Signup />} />

        {/* Route for the Login component */}
        <Route path='/login' element={<Login />} />
        <Route element= {<Layout/>}>
        {/* Route for admin */}
        <Route path='/admin/dashboard' element={<AdminDashboard/> } />
        <Route path='/admin/addmovie' element={<AddMovie/> } />
        <Route path='/admin/movie/:movieId' element={<EditMovie/>} />
        <Route path='/admin/addshow/:movieId' element={<AddShow/> } />
        <Route path='/admin/shows/:movieId' element={<ShowList/>}/>

        {/* Route for the Home component */}
        <Route path='/dashboard' element={<Dashboard />} />

        {/* Route for movie element */}
        <Route path="/customer/movies/:movieId" element={<Movie/>} />

        <Route path='/shows/:movieId' element = {<Shows/>}/>

        <Route path='/show/:showId/:movieId' element = {<Seats/>}/>
        <Route path='/mybookings/:userId' element = {<Bookings/>} />
        <Route path='/mybookings/:userId/:bookingId' element= {<Booking/>}/>
        </Route>
        
      </Routes>
    </div>
  );
}

// Exporting the App component
export default App;
