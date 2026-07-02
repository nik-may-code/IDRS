import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

const CourseCard = ({ id, name, code, instructor }) => {
  return (
    <div className="flex justify-between items-center py-3">
      <div>
        <h3 className="text-md font-semibold text-gray-800 font-Arabic">
          {name}
        </h3>
        <p className="text-sm text-gray-500 font-sans-serif">
          {code} | {instructor}
        </p>
      </div>
      <NavLink to={`/syllabus/${id}`} className="flex items-center">
        <button className="bg-gray-200 text-black border border-white rounded-full px-4 py-1 text-md hover:bg-white transition">
          View Course
        </button>
      </NavLink>
    </div>
  );
};

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/syllabus/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses. Please try again later.");
      });
  }, []);

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 font-Arabic">
          My Courses
        </h1>
        <p className="text-red-600 text-md font-Arabic">
          {" "}
          {/* Styled to match theme */}
          {error}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 font-Arabic">
        My Courses
      </h1>
      <div className="space-y-1">
        {courses.length === 0 ? (
          <p className="text-gray-500 text-md font-Arabic">
            {" "}
            {/* Styled to match theme */}
            No courses available.
          </p>
        ) : (
          courses.map((course) => (
            <CourseCard
              key={course._id}
              id={course.code}
              name={course.name}
              code={course.code}
              instructor={course.instructor}
            />
          ))
        )}
      </div>
    </div>
  );
};

function Syllabus() {
  return (
    <Layout>
      <div className="container mx-auto px-24 py-8">
        <MyCourses />
      </div>
    </Layout>
  );
}

export default Syllabus;
