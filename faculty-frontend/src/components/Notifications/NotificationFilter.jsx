export default function NotificationFilter({ filter, setFilter }) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Filter Notifications</h3>
      <div className="flex gap-2">
        {["All", "Unread", "Read"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-full ${
              filter === type ? "bg-black text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}