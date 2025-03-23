import { motion } from "framer-motion";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";

interface ReplyInputBoxProps {
  replyContent: string;
  isLoading: boolean;
  onReplyChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onReplySubmit: () => void;
}

const ReplyInputBox = ({
  replyContent,
  isLoading,
  onReplyChange,
  onReplySubmit,
}: ReplyInputBoxProps) => {
  return (
    <div className="bg-base-100 p-4 rounded-lg shadow-md">
      <textarea
        className="textarea w-full mb-4"
        placeholder="پاسخ خود را وارد کنید..."
        value={replyContent}
        onChange={onReplyChange}
        rows={3}
      />
      <motion.button
        className="btn btn-primary w-full flex items-center gap-2"
        onClick={onReplySubmit}
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <FaSpinner className="animate-spin" />
        ) : (
          <FaPaperPlane className="text-sm" />
        )}
        {isLoading ? "در حال ارسال..." : "ارسال پاسخ"}
      </motion.button>
    </div>
  );
};

export default ReplyInputBox;