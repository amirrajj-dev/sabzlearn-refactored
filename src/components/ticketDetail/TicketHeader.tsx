import Link from "next/link";
import { FaArrowLeft, FaInfoCircle } from "react-icons/fa";

interface TicketHeaderProps {
  title: string;
}

const TicketHeader = ({ title }: TicketHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <Link href="/my-account/tickets" className="btn btn-ghost">
        <FaArrowLeft />
        بازگشت به تیکت ها
      </Link>
      <h1 className="text-2xl font-bold text-base-content flex items-center gap-2">
        <FaInfoCircle className="text-primary" />
        {title}
      </h1>
    </div>
  );
};

export default TicketHeader;