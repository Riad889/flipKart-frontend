import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UserAccount = () => {
  const { id } = useParams();
  const userId = id;

  const navigate = useNavigate();
  const [food_orders_user, setFood_Orders] = useState();
  const [userData, setuserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const sendRequest = async () => {
    //console.log(id);
    const res = await axios.get(`http://localhost:5000/user/${id}`);
    const data = res.data;
    return data;
  };

  const requestForOrderList = async () => {
    const res = await axios.get("http://localhost:5000/user_orders", {
      params: {
        userId: userId,
      },
    });
    const data = res.data;
   
    return data;
  };
  useEffect(() => {
    sendRequest()
      .then((data) => setuserData(data.user))
      .catch((e) => console.log(e));

  

    requestForOrderList().then((data) => setFood_Orders(data.data));
    if (!userId) {
      navigate("/");
    }
  }, [userId]);
  //console.log("new = ",food_orders_user);
  return (
    <>
      <Box marginTop={"90px"} sx={{padding:'2%'}}>
        <Typography>FirstName: {userData.firstName}</Typography>
        <Typography>Lastname: {userData.lastName}</Typography>
        <Typography>Username: {userData.userName}</Typography>
        <Typography>Email: {userData.email}</Typography>
        <Typography>Password: {userData.password}</Typography>
        <Typography>phoneNumber: {userData.phoneNumber}</Typography>
      </Box>
<Typography variant="h3" sx={{padding:'3%'}}>Previous Orders :</Typography>
      {food_orders_user?.map((item) => (
        <Box key={item._id}>
       
          {item.food_orders?.map((i)=>(
            <Box
                sx={{
                  display: "flex",
                  height: "200px",
                  width: "75%",
                  justifyContent: "space-around",
                  justifyItems: "center",
                  borderRadius: "10px",
                  boxShadow: "2px 2px 2px 2px gray",
                  marginLeft: "20px",
                  marginRight: "20px",
                  padding: "3%",
                  marginBottom: "1rem",
                  marginTop: "5%",
                }}
              >
                <Box>
                  <img
                    style={{
                      height: "180px",
                      width: "180px",
                    }}
                    src={i.product_picture}
                    alt="product"
                  />{" "}
                </Box>

                <Box sx={{ margin: "auto" }}>
                  <Box sx={{ display: "flex" }}>
                   
                   <Typography>{i.product_quantity}</Typography>
                   
                     
                  </Box>
                 
                </Box>
                <Box sx={{ marginLeft: "10px" }}>
                  <Typography>{i.product_name}</Typography>
                  <Typography>৳ {i.product_price}</Typography>
                  
                </Box>
              </Box>
          ))}
        </Box>
      ))}
    </>
  );
};

export default UserAccount;
