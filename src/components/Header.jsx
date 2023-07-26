import React, { useState, useContext } from "react";
import { AppBar, Button, Toolbar, Typography, Badge } from "@mui/material";
import Menu from "@mui/joy/Menu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/joy/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box } from "@mui/system";
import Search from "./Search";
import LoginScreen from "./LoginScreen";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import { DataContext } from "../context/DataProvider";

const logoURL =
  "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";

const Header = () => {
  const [open, setDialogue] = useState(false);

  const userId=localStorage.getItem('userId')

  const { account, setAccount2 } = useContext(DataContext);
  const cartItems = useSelector((state) => state.cart);

  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    //console.log("First value = ", open);
    setDialogue(true);
    //console.log("Second value = ", open);
  };

  // function for logoutMenu

  const handleOpen = (event) => {
    setOpenMenu(event.currentTarget);
  };

  //function for closing the menu of logout

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  //function for logout

  const LogOut = () => {
    setAccount2("");
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <div>
    
      <AppBar
        sx={{
          background: "#74a8fc",
          opacity: "95%",
          height: "55px",

          position: "fixed",
        }}
      >
        <Toolbar>
          <Box
            onClick={() => navigate("/")}
            sx={{ marginLeft: "12%", cursor: "pointer" }}
          >
            <img src={logoURL} alt="logo" style={{ width: 75 }} />
            <Typography sx={{ fontSize: "12px" }}>Explore More</Typography>
          </Box>

          <Search />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {account ? (
              <Typography
                onClick={handleOpen}
                sx={{ cursor: "pointer" }}
                marginLeft={"3px"}
              >
                {account}
              </Typography>
            ) : (
              <Button
                onClick={handleClick}
                variant="outlined"
                sx={{ color: "black", background: "white", marginLeft: "20px" }}
              >
                Login
              </Button>
            )}

            <Menu
              id="basic-menu"
              anchorEl={openMenu}
              open={Boolean(openMenu)}
              onClose={handleCloseMenu}
              aria-labelledby="basic-demo-button"
            >
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  
                }}
              >
              <Box sx={{display:'flex',flexDirection:'column'}}>
              <Box sx={{display:'flex'}} onClick={()=>navigate(`/${userId}`)}>
              <AccountCircleIcon sx={{color:'blue'}}  />
                <Typography sx={{marginLeft:'5px'}}>User Menu</Typography>
              </Box>
             <Box sx={{display:'flex'}} onClick={()=>LogOut()}>
             <LogoutIcon color="primary" sx={{ marginRight: "5px" }} />
                <Typography >Logout</Typography>
             </Box>
                
              </Box>
               
              </MenuItem>
            </Menu>

            <Typography sx={{ marginLeft: "20px" }}>Become a Seller</Typography>
            <Typography sx={{ marginLeft: "20px" }}>More</Typography>
            <Badge badgeContent={cartItems.cartItems.length} color="secondary">
              <AddShoppingCartRoundedIcon
                onClick={() => navigate("/cart")}
                sx={{ marginLeft: "20px", cursor: "pointer" }}
              />
            </Badge>
            <Typography sx={{ marginLeft: ".35rem" }}>Cart</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <LoginScreen open={open} setDialogue={setDialogue} />
    </div>
  );
};

export default Header;
