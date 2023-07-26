import { Typography ,Box,Button,Divider} from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Countdown from "react-countdown";
import {Link} from 'react-router-dom';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Slides = ({ products,title,timer}) => {

   const renderer = ({ hours, minutes, seconds, completed }) => {
     {
       // Render a countdown
       return (
         <span>
           {hours}:{minutes}:{seconds} left
         </span>
       );
     }
   };
   const timerURL =
     "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";
  return (
    <>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          margin: "10px 20px 20px 30px",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginRight: "10px",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>

        {timer && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              style={{ marginRight: "12px" }}
              src={timerURL}
              alt="timer"
            ></img>
            <Countdown date={Date.now() + 5.04e7} renderer={renderer} />
          </Box>
        )}

        <Button variant="contained" sx={{ marginLeft: "auto" }}>
          View all
        </Button>
        <Divider sx={{ color: "black" }} />
      </Box>

     { <Carousel responsive={responsive}>
        {products.products.map((products) => (
          <Link to={`product/${products.product_number}`} style={{textDecoration:"none"}}>
            <Box sx={{ textAlign: "center" }}>
              <img
                style={{ width: "auto", height: "150px" }}
                src={products.url}
                alt="products"
              />
              <Typography sx={{ fontWeight: "bold" }}>
                {products.title.shortTitle}
              </Typography>
              <Typography sx={{ color: "green" }}>
                {products.discount}
              </Typography>
              <Typography>{products.tagline}</Typography>
            </Box>
          </Link>
        ))}
      </Carousel>
        }
    </>
  );
};
export default Slides;
