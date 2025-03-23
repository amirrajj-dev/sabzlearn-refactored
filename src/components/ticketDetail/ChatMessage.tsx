import Image from "next/image";
import { FaClock } from "react-icons/fa";
import moment from "moment";
import "moment/locale/fa";
import { IReplyUser, IUser } from "@/interfaces/interfaces";

interface ChatMessageProps {
  content: string;
  createdAt: string;
  isReply?: boolean;
  user: IReplyUser;
}

const ChatMessage = ({ content, createdAt, isReply, user }: ChatMessageProps) => {
  return (
    <div className={`chat ${isReply ? "chat-end" : "chat-start"}`}>
      <div className="chat-image">
        <Image
          src={
            user.profile || "https://secure.gravatar.com/avatar/b906ae4d8cd458c525879d1114e4390d?s=96&d=mm&r=g"
          }
          width={50}
          height={50}
          className="rounded-full"
          alt="user logo"
        />
      </div>
      <div className="chat-bubble bg-base-200 text-base-content">
        <p>{content}</p>
        <p className="text-xs text-base-content/70 mt-1 flex items-center gap-1">
          <FaClock className="text-xs" />
          {moment(createdAt).locale("fa").format("HH:mm")}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;