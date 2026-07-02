import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import Layout from '../components/Layout';

// --- Icon Components (can be moved to a separate file) ---
const DocumentIcon = () => (
  <svg className="w-6 h-6 text-gray-500 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
  </svg>
);

const VideoIcon = () => (
    <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
    </svg>
);

// --- Main Component ---
function CourseDetail() {
  const { courseId } = useParams();
  
  // State for course data, loading, and errors
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeUnitId, setActiveUnitId] = useState(null);

  // Effect to fetch course data from the backend
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId || courseId === 'undefined') {
        setError('Invalid course ID.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Fetch data from the API endpoint
        const response = await axios.get(`/api/syllabus/coursedetail/${courseId}`);
        setCourse(response.data);
        setError(null);
      } catch (err) {
        setError('Course not found or an error occurred.');
        console.error("API Error:", err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]); // Re-run effect if courseId changes

  // Effect to set the default active unit once the course is loaded
  useEffect(() => {
    if (course?.units?.length > 0) {
      setActiveUnitId(course.units[0].id);
    }
  }, [course]);

  const activeUnit = course?.units?.find(u => u.id === activeUnitId);

  // --- Render States ---

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-xl font-semibold text-gray-700">Loading course details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !course) {
    return (
      <Layout>
        <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            {error ? 'Error' : 'Course Not Found!'}
          </h1>
          <p className="text-gray-700 mb-8 text-lg">
            {error || `The course ID "${courseId}" does not match any known courses.`}
          </p>
          <Link
            to="/syllabus"
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-colors duration-150"
          >
            &larr; Back to Syllabus
          </Link>
        </div>
      </Layout>
    );
  }

  // --- Main Content Render ---

  return (
    <Layout>
      <div className="min-h-screen p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{course.name}</h1>

        {/* Unit Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          {course.units.map((unit) => (
            <button
              key={unit.id}
              onClick={() => setActiveUnitId(unit.id)}
              className={`py-3 px-5 text-sm font-medium focus:outline-none whitespace-nowrap ${
                unit.id === activeUnitId
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {unit.title.substring(0, unit.title.indexOf(':') > 0 ? unit.title.indexOf(':') : unit.title.length)}
            </button>
          ))}
        </div>

        {/* Unit Content */}
        {activeUnit ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{activeUnit.title}</h2>
            <p className="text-gray-600 text-base mb-8 leading-relaxed">{activeUnit.description}</p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
              {["Table of Contents", "Unit Overview", "Download Notes", "Watch Video"].map((action) => (
                <button
                  key={action}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium text-sm py-2 px-5 rounded-full transition-colors duration-150"
                >
                  {action}
                </button>
              ))}
            </div>

            {/* Resources */}
            <h3 className="text-xl font-semibold text-gray-800 mb-5">Resources</h3>
            <div className="space-y-3">
              {activeUnit.resources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
                >
                  {/* Use resource.type for a more robust check */}
                  {resource.type === "Video" ? <VideoIcon /> : <DocumentIcon />}
                  <div className="ml-4">
                    <p className="text-gray-800 font-semibold">{resource.title}</p>
                    <p className="text-sm text-gray-500">{resource.type}</p>
                  </div>
                </div>
              ))}
              {activeUnit.resources.length === 0 && (
                <p className="text-gray-500">No resources available for this unit yet.</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-500">Select a unit to see its details.</p>
        )}

        <div className="mt-12">
          <Link
            to="/syllabus"
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-150 font-medium"
          >
            &larr; Back to All Courses
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default CourseDetail;