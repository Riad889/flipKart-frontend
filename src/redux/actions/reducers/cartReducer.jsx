export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "AddtoCart":
      const item = action.payload;
      {
        //state.cartItems.push(item);
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case "RemoveFromCart":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product.data.product_number !== action.payload
        ),
      };
    default:
      return state;
  }
};
