import Image from "next/image";
import {
  FaUser,
  FaClock,
  FaFire,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import moment from "moment";
import "moment/locale/fa";

interface TicketMetadataProps {
  user: { name: string };
  createdAt: string;
  priority: "high" | "medium" | "low";
  status: "open" | "in_progress" | "closed";
}

const TicketMetadata = ({
  user,
  createdAt,
  priority,
  status,
}: TicketMetadataProps) => {
  return (
    <div className="bg-base-200 p-4 rounded-lg mb-6">
      <div className="flex items-center gap-4">
        <div className="avatar placeholder">
          <Image
            src={
              "https://secure.gravatar.com/avatar/b906ae4d8cd458c525879d1114e4390d?s=96&d=mm&r=g"
            }
            width={50}
            height={50}
            className="rounded-full"
            alt="user logo"
          />
        </div>
        <div>
          <p className="font-semibold flex items-center gap-2">
            <FaUser className="text-base-content/70" />
            {user.name}
          </p>
          <p className="text-sm text-base-content/70 flex items-center gap-2">
            <FaClock className="text-base-content/70" />
            ایجاد شده در: {moment(createdAt).locale("fa").format("YYYY/MM/DD HH:mm")}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span
          className={`badge ${
            priority === "high"
              ? "badge-error"
              : priority === "medium"
              ? "badge-warning"
              : "badge-success"
          } flex items-center gap-1`}
        >
          {priority === "high" ? (
            <FaFire className="text-sm" />
          ) : priority === "medium" ? (
            <FaExclamationCircle className="text-sm" />
          ) : (
            <FaCheckCircle className="text-sm" />
          )}
          {priority === "high" ? "بالا" : priority === "medium" ? "متوسط" : "کم"}
        </span>
        <span
          className={`badge ${
            status === "open"
              ? "badge-info"
              : status === "in_progress"
              ? "badge-warning"
              : "badge-success"
          } flex items-center gap-1`}
        >
          {status === "open" ? (
            <FaClock className="text-sm" />
          ) : status === "in_progress" ? (
            <FaExclamationCircle className="text-sm" />
          ) : (
            <FaCheckCircle className="text-sm" />
          )}
          {status === "open"
            ? "باز"
            : status === "in_progress"
            ? "در حال بررسی"
            : "بسته"}
        </span>
      </div>
    </div>
  );
};

export default TicketMetadata;