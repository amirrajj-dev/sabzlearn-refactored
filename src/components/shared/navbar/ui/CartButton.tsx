import { FaShoppingCart } from "react-icons/fa";

const CartButton = () => {
  return (
    <div className="relative">
      <button className="btn btn-ghost text-white hover:text-primary">
        <FaShoppingCart className="text-xl text-base-content" />
      </button>
    </div>
  );
};

export default CartButton;