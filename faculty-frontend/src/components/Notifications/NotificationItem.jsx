import { FileText, Megaphone, X, Check } from "lucide-react";

export default function NotificationItem({ notification, isExpanded, toggleExpand }) {
  const iconMap = {
    document: <FileText className="w-6 h-6" />,
    notice: <Megaphone className="w-6 h-6" />,
    leave: notification.title.includes("Rejected") ? <X className="w-6 h-6" /> : <Check className="w-6 h-6" />,
  };

  return (
    <div
      className="flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-gray-50"
      onClick={toggleExpand}
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100">
        {iconMap[notification.type]}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className={`font-semibold ${notification.isRead ? "text-gray-600" : "text-black"}`}>
            {notification.title}
          </h4>
          <span className="text-gray-400 text-xs">{notification.time}</span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-gray-500 text-sm mt-2">{notification.description}</p>
        </div>
      </div>
      {!notification.isRead && !isExpanded && (
        <div className="ml-auto">
          <span className="w-2 h-2 rounded-full bg-black inline-block"></span>
        </div>
      )}
    </div>
  );
}