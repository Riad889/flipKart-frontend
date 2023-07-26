import React from "react";
import { useState,useEffect } from "react";
import { Box, InputBase } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {useSelector,useDispatch} from 'react-redux';

const Search = () => {
  const [Text,setText]=useState();
  const getText=(text)=>{
    setText(text);
  }
  return (
    <>
      <Box
        sx={{
          background: "#fff",
          width: "34%",

          marginLeft: "20px",
          borderRadius: "3px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <InputBase
          sx={{ width: "100%", marginLeft:"3px" }}
          placeholder="Search for products brands and more"
          onChange={(e)=>getText(e.target.value)}
        />
        <Box>
          <SearchRoundedIcon sx={{ color: "black", marginTop: "3.5px" }} />
        </Box>
      </Box>
    </>
  );
};

export default Search;
