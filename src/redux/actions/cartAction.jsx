import axios from "axios";

export const addToCart = (product_number, quantity) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `https://flipkart-server-81ps.onrender.com/products/${product_number}`
    );
    dispatch({ type: "AddtoCart", payload: { ...data, quantity } });
  } catch (error) {
    console.log(error);
  }
};
export const removeFromCart = (product_number) => (dispatch)=>{
  
        dispatch({ type: "RemoveFromCart", payload: product_number });
    
};
