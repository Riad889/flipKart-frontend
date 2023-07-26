import { imageURL } from "../constrains/data";
import { Grid } from "@mui/material";

const MidSection = () => {
  return (
    <Grid lg={12} md={12} sm={12} xs={12} container>
        
      {imageURL.map((url) => (
        <Grid item lg={4} md={4} sm={12} xs={12}>


        <img style={{width:"100%"}} src={url} alt="bannerImage" />

        </Grid>
      ))}
    </Grid>
  );
};
export default MidSection;
