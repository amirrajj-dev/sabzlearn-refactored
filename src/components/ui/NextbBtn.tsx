import SwiperInstance from "swiper";
import { GrNext } from "react-icons/gr";

export interface SwiperButtonProps {
  swiperRef: React.RefObject<SwiperInstance | null>;
}

const NextBtn = ({ swiperRef }: SwiperButtonProps) => {
  return (
    <button
      onClick={() => swiperRef.current?.slideNext()}
      className="btn btn-success btn-circle btn-lg btn-soft"
    >
      <GrNext/>
    </button>
  );
};

export default NextBtn;