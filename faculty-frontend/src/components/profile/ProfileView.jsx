import React from 'react';
import { FaUserCircle } from 'react-icons/fa';


const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-lg">{value || 'N/A'}</p>
  </div>
);

const ProfileView = ({ user, onEdit }) => {
  if (!user) {
    return null;
  }

  
  const fullPhotoUrl = user.photoUrl;

  const displayDate = user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A';

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-2/3 space-y-4">
          <DetailItem label="Your name: " value={user.name} />
          <DetailItem label="Email Address:" value={user.email} />
          <DetailItem label="Faculty ID:" value={user.faculty_id} />
          <DetailItem label="Mobile:" value={user.mobile} />
          <DetailItem label="Date Of Birth:" value={displayDate} />
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center mt-8 md:mt-0">
          <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
            {fullPhotoUrl ? (
              <img
                src={fullPhotoUrl} 
                alt="Profile"
                className="w-full h-full object-cover"
              
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <FaUserCircle size={80} className="text-gray-400" />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={onEdit}
          className="bg-black text-white px-8 py-2 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileView;