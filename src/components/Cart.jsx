import { Grid, Typography, Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const food_orders = [];

  cartItems.cartItems.map((item) =>
    food_orders.push({
      product_name: item.data.title.longTitle,
      product_price: item.data.price.cost,
      product_picture: item.data.detailUrl,
      product_quantity: item.quantity,
    })
  );

  console.log(food_orders);
  const [location, setLocation] = useState();
  const navigate = useNavigate();
  let [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  let userId;
  const sendRequest = async () => {
    const res = await axios.post(`http://localhost:5000/${userId}/addOrder`, {
      location: location,
      user: userId,
      food_orders: food_orders,
    });
    const data = res.data;
    return data;
  };

  const handleOrder = () => {
    userId = localStorage.getItem("userId");
    if (userId) {
      sendRequest()
        .then(() => navigate('/orderComplete'))
        .catch((error) => console.log(error));
    } else {
      console.log("Login First");
    }
  };

  const handleChange = (event) => {
    setLocation(event.target.value);
  };
  //console.log(cartItems);
  const totalAmount = () => {
    let price = 0,
      discount = 0;
    cartItems.cartItems.map((items) => {
      price += items.data.price.mrp;
      discount += items.data.price.mrp - items.data.price.cost;
    });
    setTotalPrice(price);
    setTotalDiscount(discount);
  };
  useEffect(() => {
    totalAmount();
  }, [cartItems]);

  const removeItemFromCart = (id) => {
    //console.log(id);
    dispatch(removeFromCart(id));
  };

  const increase = () => {
    quantity = quantity + 1;
    setQuantity(quantity);
  };
  const decrease = () => {
    if (quantity > 1) {
      quantity = quantity - 1;
      setQuantity(quantity);
    }
  };
  return (
    <>
      {cartItems.cartItems.length ? (
        <Grid container>
          <Grid item lg={9} md={9} sm={12} xs={12}>
            <Box
              sx={{
                marginBottom: "20px",
                marginLeft: "20px",
                padding: "10px",
                marginTop: "5%",
              }}
            >
              <Typography variant="h5">
                MyCart ({cartItems.cartItems.length})
              </Typography>
            </Box>

            {cartItems.cartItems.map((item) => (
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
                  padding: "10px",
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
                    src={item.data.detailUrl}
                    alt="product"
                  />{" "}
                </Box>

                <Box sx={{ margin: "auto" }}>
                  <Box sx={{ display: "flex" }}>
                    <Button variant="outlined" onClick={decrease}>
                      -
                    </Button>
                    <Button disabled>{quantity}</Button>
                    <Button variant="outlined" onClick={increase}>
                      +
                    </Button>
                  </Box>
                  <Button
                    sx={{ marginLeft: "40px" }}
                    color="error"
                    onClick={() => removeItemFromCart(item.data.product_number)}
                  >
                    Remove Item
                  </Button>
                </Box>
                <Box sx={{ marginLeft: "10px" }}>
                  <Typography>{item.data.title.longTitle}</Typography>
                  <Typography>৳ {item.data.price.mrp}</Typography>
                  <Typography>
                    ৳{item.data.price.cost}{" "}
                    <span style={{ color: "green", fontSize: "20px" }}>
                      {item.data.price.discount} off
                    </span>
                  </Typography>
                </Box>
              </Box>
            ))}
            <form>
              <TextField
                id="outlined-basic"
                label="Enter the location"
                variant="outlined"
                onChange={handleChange}
                required
                name="location"
                sx={{ marginLeft: "17px" }}
              />
              <Button
                variant="outlined"
                sx={{
                  color: "black",
                  background: "orange",
                  float: "right",
                  marginTop: "1rem",
                  marginRight: "190px",
                  marginBottom: "40px",
                }}
                onClick={handleOrder}
              >
                Place Order
              </Button>
            </form>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Box sx={{ marginTop: "25%" }}>
              <Typography
                sx={{
                  boxShadow: "1px 2px 3px 1.5px gray",
                  padding: "10px",
                  marginRight: "30px",
                  color: "gray",
                  marginBottom: "15px",
                  marginTop: "20px",
                }}
                variant="h3"
              >
                Price details
              </Typography>
              <Box
                sx={{
                  boxShadow: "1px 2px 3px 1.5px gray",
                  padding: "10px",
                  marginRight: "30px",
                }}
              >
                <Typography sx={{ marginBottom: "10px", padding: "10px" }}>
                  Price({cartItems.cartItems.length}){" "}
                  <span style={{ float: "right" }}>৳{totalPrice}</span>
                </Typography>
                <Typography sx={{ marginBottom: "10px", padding: "10px" }}>
                  Discount
                  <span style={{ float: "right" }}>-৳{totalDiscount}</span>
                </Typography>
                <Typography sx={{ marginBottom: "10px", padding: "10px" }}>
                  Delivery Charges
                  <span style={{ float: "right" }}>৳100</span>
                </Typography>
                <Typography sx={{ marginBottom: "10px", padding: "10px" }}>
                  Total Amount
                  <span style={{ float: "right" }}>
                    ৳{totalPrice - totalDiscount + 100}
                  </span>
                </Typography>
                <Typography
                  sx={{ marginBottom: "10px", padding: "10px", color: "green" }}
                >
                  You will save ৳{totalDiscount - 100} on this order
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",

            flexDirection: "row",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Typography variant="h3" sx={{ margin: "auto" }}>
            No Item In Cart
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Cart;
