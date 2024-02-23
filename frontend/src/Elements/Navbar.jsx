import {useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useContext} from "react";
import UserContext from "../Context/userContext.js"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate()

  const checkAuth = async () => {
    const response = await axios.get("/checkauth", { withCredentials: true });
    console.log("check auth", response);

    if (response.status === 200) {
      setUser({ email: response.data.email, id: response.data.id, isAdmin: response.data.isAdmin});
    } else{
      navigate('/login')
    }
    console.log("context from navbar",user)
  };
  useEffect(() => {
    checkAuth();
  },[]);

  const logOut = async () => {
    const response = await axios.get("/logout", { withCredentials: true });
    console.log("logout response", response)
    if (response.status === 200) {
      navigate('/login')
    }
  };

  const goHome = () => {
    if(user.isAdmin) {
      navigate('/admin/dashboard')
    }else{
      navigate('/dashboard')
    }
    
  }
 
  return (
    <AppBar sx={{ position: 'relative', backgroundColor: '#3D0C11'}}>
    <Toolbar> 
    <IconButton
    color="inherit"
    onClick={goHome}
    aria-label="close"
    sx={{ ml:2 , transform:'scale(1.5)' }}   
    >
      <HomeIcon/>
    </IconButton>
    <Typography sx={{ ml: 2, flex: 1, textAlign: 'right'}} variant="h6" component="div">
      {user?.email}
    </Typography>    
    <IconButton
    color="inherit"
    onClick={logOut}
    aria-label="close"
    sx={{ ml:2 , }}   
    >
      {user && (
          <LogoutIcon/>
        )}
    </IconButton>
    </Toolbar>
    </AppBar>
  );
};
export default Navbar;
