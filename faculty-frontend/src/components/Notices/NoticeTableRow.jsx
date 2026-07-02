// src/components/Notices/NoticeTableRow.jsx

const NoticeTableRow = ({ notice, onView, onEdit, onDelete }) => {
  const formattedDate = new Date(notice.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const recipientsText = notice.recipients?.join(', ') || 'N/A';

  return (
    <tr>
      <td className="px-6 py-4 text-md">{notice.title}</td>
      <td className="px-6 py-4 text-md text-gray-500">{recipientsText}</td>
      <td className="px-6 py-4 text-md text-gray-500">{formattedDate}</td>
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