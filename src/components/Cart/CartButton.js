import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";

import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.productCount)

  function toogleShowCart() {
    dispatch(uiActions.toogle());
  }

  return (
    <button className={classes.button} onClick={toogleShowCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cart}</span>
    </button>
  );
};

export default CartButton;
