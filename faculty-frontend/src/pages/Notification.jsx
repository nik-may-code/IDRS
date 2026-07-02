import { useState, useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { requestFCMToken, onMessageListener } from "../notifications/firebase.js";
import NotificationItem from "../components/Notifications/NotificationItem";
import NotificationFilter from "../components/Notifications/NotificationFilter";
import NotificationSort from "../components/Notifications/NotificationSort";
import NotificationActions from "../components/Notifications/NotificationActions";
import NotificationPagination from "../components/Notifications/NotificationPagination";
import { useAuth } from "../context/AuthContext";

const pageSize = 4;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function Notification({ onUnreadCountChange }) {
  const { user, loading } = useAuth();
  const facultyId = user?.faculty_id;
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Most Recent");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState({});
  const [loadingNotifs, setLoadingNotifs] = useState(false);
  const [err, setErr] = useState(null);

  const fetchNotifs = async () => {
    if (loading || !facultyId) return;
    setLoadingNotifs(true);
    try {
      const res = await axios.get(`${BASE_URL}/notification-status`, {
        headers: { "x-faculty-id": facultyId },
      });

      const mapped = res.data.map((n) => ({
        id: n.notificationId,
        type: n.type || "document",
        title: n.title || "New Update",
        description: n.body || n.message || "No description provided",
        time: formatDistanceToNow(new Date(n.createdAt), { addSuffix: true }),
        isRead: n.read,
        createdAt: n.createdAt || new Date().toISOString(),
      }));
      setNotifications(mapped);
    } catch {
      setErr("Failed to fetch notifications");
    } finally {
      setLoadingNotifs(false);
    }
  };

  const initFCM = async () => {
    if (loading || !facultyId) return;
    try {
      const token = await requestFCMToken();
      if (token) {
        await axios.post(`${BASE_URL}/store-subscription`, {
          faculty_id: facultyId,
          token,
        });

      }
    } catch {
      setErr("Failed to initialize notifications");
    }
  };

  const markAsRead = async (id) => {
    if (!facultyId) return;
    try {
      await axios.post(`${BASE_URL}/mark-notification-read`, {
        faculty_id: facultyId,
        notificationId: id,
      });

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch {
      setErr("Failed to mark notification as read");
    }
  };

  const markAllAsRead = async () => {
    if (!facultyId) return;
    try {
      const unread = notifications.filter((n) => !n.isRead);
      for (const n of unread) {
        await axios.post(`${BASE_URL}/mark-notification-read`, {
          faculty_id: facultyId,
          notificationId: n.id,
        });

      }
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setPage(1);
    } catch {
      setErr("Failed to mark all notifications as read");
    }
  };

  const clearAll = async () => {
    if (!facultyId) return;
    try {
      await axios.delete(`${BASE_URL}/notification-status`, {
        headers: { "x-faculty-id": facultyId },
      });

      setNotifications([]);
      setPage(1);
    } catch {
      setErr("Failed to clear notifications");
    }
  };

  const filtered = notifications.filter((n) =>
    filter === "All" ? true : filter === "Unread" ? !n.isRead : n.isRead
  );

  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "Most Recent"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
  );

  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);
  const pageCount = Math.ceil(sorted.length / pageSize);

  useEffect(() => {
    const maxPage = Math.ceil(sorted.length / pageSize);
    if (page > maxPage && maxPage > 0) {
      setPage(1);
    }
  }, [filter, sortOrder, notifications, page]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    if (onUnreadCountChange) {
      onUnreadCountChange(unreadCount);
    }
  }, [unreadCount, onUnreadCountChange]);

  useEffect(() => {
    if (!loading && facultyId) {
      fetchNotifs();
      initFCM();
      const unsub = onMessageListener((payload) => {
        const newNotif = {
          id: payload.messageId || Date.now().toString(),
          type: payload.data?.type,
          title: payload.notification?.title || "New Notification",
          description:
            payload.notification?.body ||
            payload.data?.body ||
            payload.data?.message,
          time: formatDistanceToNow(new Date(), { addSuffix: true }),
          isRead: false,
          createdAt: new Date().toISOString(),
        };
        setNotifications((prev) => [newNotif, ...prev]);
      });
      return () => unsub();
    }
  }, [loading, facultyId]);

  const toggleExpand = (id) => {
    setExpanded((prev) => {
      const newVal = !prev[id];
      if (newVal && !notifications.find((n) => n.id === id).isRead) {
        markAsRead(id);
      }
      return { ...prev, [id]: newVal };
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageCount) {
      setPage(newPage);
    }
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <div className="p-6 bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Notifications</h2>
        <p className="text-gray-500 mb-6">
          Stay informed on all important updates related to leaves, documents, and announcements.
        </p>
        {loadingNotifs && <p className="text-gray-500">Loading notifications...</p>}
        {err && <p className="text-red-500">{err}</p>}
        <NotificationFilter filter={filter} setFilter={setFilter} />
        <div className="mt-6">
          <NotificationSort sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>
        <div className="mt-8 bg-gray-100 rounded-lg overflow-hidden">
          {paginated.length === 0 && !loadingNotifs && !err && (
            <p className="text-center text-gray-400 p-6">No notifications!</p>
          )}
          {paginated.map((n) => (
            <NotificationItem
              key={n.id}
              notification={n}
              isExpanded={expanded[n.id] || false}
              toggleExpand={() => toggleExpand(n.id)}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          {pageCount > 1 && (
            <NotificationPagination
              currentPage={page}
              totalPages={pageCount}
              onPageChange={handlePageChange}
            />
          )}
        </div>
        <NotificationActions markAllAsRead={markAllAsRead} clearAll={clearAll} />
      </div>
    </div>
  );
}