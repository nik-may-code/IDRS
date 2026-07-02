import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

export default function DiscussionPage() {
  const [discussions, setDiscussions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDiscussions = async () => {
    try {
      const res = await axios.get("/api/discussions/all");
      if (res.data.success) {
        setDiscussions(res.data.discussions);
        setFiltered(res.data.discussions);
      }
    } catch (err) {
      console.error("Failed to fetch discussions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setSearch(q);
    setFiltered(
      discussions.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.author.toLowerCase().includes(q) ||
          (d.tags && d.tags.toLowerCase().includes(q))
      )
    );
  };

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`;
    return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? "s" : ""} ago`;
  };

  return (
    <Layout>
      <div className="p-8 bg-white min-h-screen">
        <h1 className="text-4xl font-bold">Discussion Forum</h1>
        <p className="text-gray-500 mt-1 mb-8 ml-[5px]">
          Engage with fellow alumni, share insights, and explore opportunities.
        </p>

        <div className="mb-2">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search discussions by title, author or tag..."
            className="w-full px-4 py-2 rounded-md bg-gray-100 outline-none border-none"
          />
        </div>
        <div className="flex justify-end mb-6">
          <Link to="/discussionform">
            <button className="bg-blue-100 text-blue-900 font-semibold text-sm px-4 py-2 rounded-full hover:bg-blue-200">
              Start a New Discussion
            </button>
          </Link>
        </div>

        <h2 className="text-2xl font-bold ml-[10px] mb-6">Active Discussions</h2>

        {loading ? (
          <p className="text-gray-400 text-sm ml-2">Loading discussions...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400 text-sm ml-2">No discussions found.</p>
        ) : (
          <ul className="space-y-5">
            {filtered.map((d) => (
              <li key={d._id} className="flex justify-between items-start pb-4 border-b border-gray-100">
                <Link to={`/discussions/${d._id}`} className="flex items-start gap-4 w-full hover:bg-gray-50 p-2 rounded transition block">
                  <div className="bg-gray-100 px-4 py-2 text-3xl rounded text-black-400">#</div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{d.title}</p>
                    <p className="text-sm text-gray-500">Last activity: {timeAgo(d.updatedAt)}</p>
                    <p className="text-sm text-gray-500">
                      Posted by {d.author}
                      {d.tags && (
                        <span className="ml-2 bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                          {d.tags}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 whitespace-nowrap">
                    {d.replies?.length ?? 0} {d.replies?.length === 1 ? "reply" : "replies"}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
