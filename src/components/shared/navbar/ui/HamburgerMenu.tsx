import { IoIosMenu } from "react-icons/io";

const HamburgerMenu = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick} className="btn btn-ghost text-white hover:text-primary">
      <IoIosMenu className="text-3xl text-base-content" />
    </button>
  );
};

export default HamburgerMenu;