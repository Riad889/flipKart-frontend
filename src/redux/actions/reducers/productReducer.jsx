export const getProductsReducer = (state = { product: [] }, actions) => {
  switch (actions.type) {
    case "success":
      return { products: actions.payload };
    case "productFailed":
      return { error: actions.payload };
    default:
      return state;
  }
};


