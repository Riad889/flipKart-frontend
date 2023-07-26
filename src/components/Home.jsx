import { Typography, Box} from "@mui/material";
import React from "react";
import { navData, bannerData } from "../constrains/data";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect } from "react";
import {getAllProductsFromServer} from "../redux/actions/productActions";
import {  useDispatch,useSelector } from "react-redux";
import MidSection from "./MidSection";
import Slides from './Slides'


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Home = () => {
  //console.log(navData);
const dispatch = useDispatch();
const {products}=useSelector((state=>state.getProducts))
  useEffect(() => {
    dispatch(getAllProductsFromServer());
  }, [dispatch]);
  //console.log("Products from frontend : ", products);

  return (
    <>
    <marquee style={{marginTop:'6%'}}>The website is still under development, and there is a lot of work yet to be completed and all the feature is not fully functional </marquee>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
   
        {navData.map((data) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor:"pointer",
              marginTop:"5%"
            }}
          >
            <img src={data.url} alt="nav" />
            <Typography varient="h7">{data.text}</Typography>
          </Box>
        ))}
      </Box>

      <Box>
        <Carousel
          containerClass="carousel-container"
          swipeable={false}
          draggable={false}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1000}
          customTransition="all .5"
          responsive={responsive}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {bannerData.map((data) => (
            <img
              style={{ width: "100%", height: "310px" }}
              src={data.url}
              alt="img"
            />
          ))}
        </Carousel>
      </Box>

      {
        products &&
        <Box>
          <Slides products={products} title="Deal of the day" timer={true} />
          <MidSection />
          <Slides products={products} title="Discount for you" timer={false} />
          <MidSection />
          <Slides products={products} title="Top Selection" timer={false} />
          <MidSection />
          <Slides products={products} title="Your Choice" timer={false} />
          <MidSection />
        </Box>
      }
    </>
  );
};

export default Home;
