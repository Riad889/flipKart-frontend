import React from "react";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useParams } from "react-router-dom";
import { productDetails } from "../redux/actions/productActions";

import { addToCart } from "../redux/actions/cartAction";

const DetailView = () => {
  const [productData, setProductData] = useState();
  const [quantity,setQuantity]=useState(1);
  const dispatch=useDispatch();
  //const navigate=useNavigate();
  const { id } = useParams();
  //console.log("Product number = ", id);
  const sendRequest = async () => {
    const res = await axios.get(
      `https://flipkart-server-81ps.onrender.com/products/${id}`
    );
    const data = res.data;
    return data;
  };

  const addItemToCart=()=>{
    dispatch(addToCart(id, quantity));
      //navigate('/cart')
  }
  useEffect(() => {
    sendRequest()
      .then((data) => setProductData(data))
      .catch((error) => console.log(error));
  }, [id]);
  //console.log(productData);
  return (
    <div>
      {productData && (
        <Box sx={{ display: "flex", flexDirection: "row",marginTop:"5%" }}>
          <Box
            sx={{
              display: "flex",
              padding: "30px",
              flexDirection: "column",
              width: "20%",
              justifyItems: "center",
            }}
          >
            <img
              style={{ marginLeft: "30px" }}
              src={productData.data.detailUrl}
              alt="productImage"
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Button
              onClick={()=>addItemToCart()}
                varient="outlined"
                sx={{ background: "orange", width: "50%", marginRight: "10px" }}
              >
                <ShoppingCartIcon />
                Add to Cart
              </Button>
              <Button
                varient="outlined"
                sx={{ background: "orange", width: "50%" }}
              >
                <ShoppingCartIcon />
                Buy
              </Button>
            </Box>
          </Box>
          <Box sx={{display:"flex",flexDirection:"column",marginTop:"30px"}}>
            <Typography>{productData.data.title.longTitle}</Typography>
            <Typography>{productData.data.title.shortTitle}</Typography>
            <Typography sx={{ color: "green" }}>
              {productData.data.discount}
            </Typography>
            <Typography>৳ {productData.data.price.mrp}</Typography>
            <Typography sx={{ color: "green" }}>
              {productData.data.price.discount} discount
            </Typography>
            <Typography>৳ {productData.data.price.cost}</Typography>
            <Typography>{productData.data.description}</Typography>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default DetailView;
