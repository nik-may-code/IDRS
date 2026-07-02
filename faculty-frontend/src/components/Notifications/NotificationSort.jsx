export default function NotificationSort({ sortOrder, setSortOrder }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Sort By</h3>
      <div className="flex gap-2">
        {["Most Recent", "Oldest"].map((order) => (
          <button
            key={order}
            className={`px-4 py-2 rounded-full ${
              sortOrder === order ? "bg-black text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => setSortOrder(order)}
          >
            {order}
          </button>
        ))}
      </div>
    </div>
  );
}