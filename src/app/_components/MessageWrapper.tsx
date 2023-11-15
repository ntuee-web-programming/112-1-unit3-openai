import { Message } from "@/utils/types";

type Props = {
  message: Message;
};
export default function MessageWrapper({ message }: Props) {
  if (message.role === "system") return null;

  return (
    <div
      className={`flex w-full ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`py-2 px-4 max-w-[75%] rounded-xl ${
          message.role === "user"
            ? "bg-gray-200 text-gray-800"
            : "bg-teal-600 text-white"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
