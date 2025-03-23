import { SwiperButtonProps } from "./NextbBtn";
import { GrPrevious } from "react-icons/gr";

const PrevBtn = ({ swiperRef }: SwiperButtonProps) => {
  return (
    <button
      onClick={() => swiperRef.current?.slidePrev()}
      className="btn btn-success btn-circle btn-lg btn-soft"
    >
      <GrPrevious/>
    </button>
  );
};

export default PrevBtn;