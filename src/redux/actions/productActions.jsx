import axios from "axios";

export const getAllProductsFromServer=()=>async(dispatch)=>{
    try {
        const { data } = await axios.get(
          "https://flipkart-server-81ps.onrender.com/products"
        );
        //console.log("Data is  = ",data);
        dispatch({type:'success', payload:data})
    } catch (error) {
        dispatch({ type: "productFailed", payload: error.message });
    }
}

