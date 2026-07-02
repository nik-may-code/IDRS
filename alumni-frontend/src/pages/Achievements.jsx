import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isPosting, setIsPosting] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
  });

  const userName = localStorage.getItem("user_name") || "Alumni User";

  const fetchAchievements = async () => {
    try {
      const response = await axios.get("/api/achievements/all");
      if (response.data.success) {
        setAchievements(response.data.achievements);
      }
    } catch (error) {
      console.error("Failed to fetch achievements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleInputChange = (e) => {
    setNewAchievement({ ...newAchievement, [e.target.name]: e.target.value });
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...newAchievement, alumniName: userName };
      const response = await axios.post("/api/achievements", payload);
      if (response.data.success) {
        setIsPosting(false);
        setNewAchievement({ title: "", description: "" });
        fetchAchievements();
      }
    } catch (error) {
      console.error("Failed to post achievement:", error);
      alert("Failed to post achievement.");
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Alumni Wall of Fame</h1>
            <p className="text-gray-600 mt-1">Celebrate the milestones and successes of your peers.</p>
          </div>
          <button 
            onClick={() => setIsPosting(!isPosting)}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition shadow-sm font-medium"
          >
            {isPosting ? "Cancel" : "Share a Milestone"}
          </button>
        </div>

        {isPosting && (
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Share Your Achievement</h2>
            <form onSubmit={handlePost} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Headline *</label>
                <input required type="text" name="title" value={newAchievement.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded focus:ring-yellow-500" placeholder="e.g. Promoted to Senior Engineer at Tesla" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Story / Details *</label>
                <textarea required name="description" value={newAchievement.description} onChange={handleInputChange} rows="3" className="w-full px-4 py-2 border rounded focus:ring-yellow-500" placeholder="Share your journey..."></textarea>
              </div>
              <div>
                <button type="submit" className="px-6 py-2 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600 transition">
                  Publish
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-gray-500">Loading achievements...</p>
        ) : achievements.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">No achievements shared yet. Be the first!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {achievements.map((item) => (
              <div key={item._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xl font-bold">
                    🏆
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    <span className="font-semibold text-gray-700">{item.alumniName}</span> • {new Date(item.dateAchieved).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 whitespace-pre-wrap">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Achievements;
