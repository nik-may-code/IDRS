import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

export default function DiscussionDetail() {
  const { id } = useParams();
  const [discussion, setDiscussion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchDiscussion = async () => {
    try {
      const res = await axios.get(`http://localhost:5003/api/discussions/${id}`);
      if (res.data.success) {
        setDiscussion(res.data.discussion);
      }
    } catch (err) {
      console.error("Failed to fetch discussion:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussion();
  }, [id]);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    setSubmitting(true);
    try {
      const author = localStorage.getItem("student_user") || "Student User";
      const res = await axios.post(`http://localhost:5003/api/discussions/${id}/reply`, { author, content: replyContent });
      if (res.data.success) {
        setDiscussion(res.data.discussion);
        setReplyContent("");
      }
    } catch (err) {
      console.error("Failed to post reply:", err);
    } finally {
      setSubmitting(false);
    }
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

  if (loading) {
    return (
      <Layout>
        <div className="p-8 bg-white min-h-screen">
          <p className="text-gray-500">Loading discussion...</p>
        </div>
      </Layout>
    );
  }

  if (!discussion) {
    return (
      <Layout>
        <div className="p-8 bg-white min-h-screen">
          <p className="text-red-500">Discussion not found.</p>
          <Link to="/discussionpage" className="text-blue-500 underline mt-4 block">Back to discussions</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 bg-white min-h-screen max-w-4xl mx-auto">
        <Link to="/discussionpage" className="text-blue-500 hover:underline mb-6 inline-block">
          &larr; Back to discussions
        </Link>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{discussion.title}</h1>
            {discussion.tags && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {discussion.tags}
              </span>
            )}
          </div>
          <div className="flex items-center text-gray-500 text-sm mb-6 border-b border-gray-200 pb-4">
            <span className="font-semibold text-gray-700 mr-2">{discussion.author}</span>
            <span>•</span>
            <span className="mx-2">{timeAgo(discussion.createdAt)}</span>
          </div>
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-lg">
            {discussion.details}
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2">
          {discussion.replies?.length || 0} Replies
        </h2>

        <div className="space-y-6 mb-8">
          {discussion.replies?.map((reply) => (
            <div key={reply._id} className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                  {reply.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{reply.author}</div>
                  <div className="text-xs text-gray-500">{timeAgo(reply.createdAt)}</div>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{reply.content}</p>
            </div>
          ))}
          {(!discussion.replies || discussion.replies.length === 0) && (
            <p className="text-gray-500 italic">No replies yet. Be the first to reply!</p>
          )}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-4">Add a Reply</h3>
          <form onSubmit={handleReply}>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              rows="4"
              placeholder="Write your reply here..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              required
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting || !replyContent.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg disabled:opacity-50 transition-colors"
              >
                {submitting ? "Posting..." : "Post Reply"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
