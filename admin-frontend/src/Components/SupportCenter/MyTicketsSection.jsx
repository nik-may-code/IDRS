import React, { useEffect, useState } from 'react';
import { Ticket, Clock, CheckCircle } from 'lucide-react';

const MyTicketsSection = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch('/api/support/tickets');
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        console.error('Failed to fetch tickets:', err);
      }
    };

    fetchTickets();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Open':
        return <Ticket className="w-5 h-5 text-red-500" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'Resolved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Ticket className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">My Support Tickets</h2>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(ticket.status)}
                    <p className="ml-3 text-sm font-medium text-gray-900">{ticket.title}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${ticket.status === 'Open' ? 'bg-red-100 text-red-800' :
                        ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                            ticket.status === 'Closed' ? 'bg-gray-100 text-gray-800' : ''}`}>
                      {ticket.status}
                    </span>
                    {ticket.status !== 'Closed' && (
                      <button
                        className="ml-2 px-2 py-1 text-xs font-semibold text-white bg-gray-700 rounded hover:bg-gray-900 focus:outline-none"
                        onClick={async () => {
                          setTickets((prev) => prev.map((t) => t.id === ticket.id ? { ...t, status: 'Closed' } : t));
                          try {
                            await fetch(`/api/support/tickets/${ticket.id}/close`, {
                              method: 'POST',
                            });
                          } catch (err) {
                            console.error('Failed to close ticket:', err);
                          }
                        }}
                      >
                        Close
                      </button>
                    )}
                    {ticket.status === 'Closed' && (
                      <button
                        className="ml-2 px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded hover:bg-red-800 focus:outline-none"
                        onClick={async () => {
                          setTickets((prev) => prev.filter((t) => t.id !== ticket.id));
                          try {
                            await fetch(`/api/support/tickets/${ticket.id}`, {
                              method: 'DELETE',
                            });
                          } catch (err) {
                            console.error('Failed to delete ticket:', err);
                          }
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{ticket.description}</p>
                  <p className="mt-1 text-sm text-gray-500">Created on {ticket.created}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyTicketsSection;
