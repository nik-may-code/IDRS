const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow duration-200">
    <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

export default StatCard;
