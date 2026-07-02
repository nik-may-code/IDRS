const NoticeTableRow = ({ notice, onView, onEdit, onDelete }) => {
  return (
    <tr>
      <td className="px-6 py-4 text-md">{notice.title}</td>
      <td className="px-6 py-4 text-md text-gray-500">{notice.recipients}</td>
      <td className="px-6 py-4 text-md text-gray-500">{notice.date}</td>
      <td className="px-6 py-4 space-x-2 text-sm">
        <button onClick={() => onView(notice)} className="font-medium text-gray-600 hover:underline">View</button>
        <span className="text-gray-600">|</span>
        <button onClick={() => onEdit(notice)} className="font-medium text-gray-600 hover:underline">Edit</button>
        <span className="text-gray-600">|</span>
        <button onClick={() => onDelete(notice)} className="font-medium text-gray-600 hover:underline">Delete</button>
      </td>
    </tr>
  );
};

export default NoticeTableRow;
