import { uiActions } from "./uiSlice";
import { cartActions } from "./cartSlice";

export const fetchCartData = () => {

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-688a7-default-rtdb.firebaseio.com/cart.json"
      );

      if(!response.ok) {
        throw new Error("Colud not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({products: cartData.products || [] , productCount: cartData.productCount}));
    } catch(error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "Fetching cart data failed!",
        })
      );
    }

  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sedning cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-688a7-default-rtdb.firebaseio.com/cart.json",
        { method: "PUT", body: JSON.stringify({products: cart.products , productCount: cart.productCount}) }
      );

      if (!response.ok) {
        throw new Error("Sending cart date failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success...",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
