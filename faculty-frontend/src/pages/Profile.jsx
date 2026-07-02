//src/pages/Profile.jsx
import React, { useState, useEffect, useCallback } from 'react';
import ProfileView from '../components/profile/ProfileView';
import ProfileEdit from '../components/profile/ProfileEdit';
import { getProfile, updateProfile } from '../api/profile';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUserProfile = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (err) {
      setError('Failed to fetch profile. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleSave = async (formData) => {
    setError('');
    try {
      await updateProfile(formData);
      setIsEditing(false); 
      fetchUserProfile(); 
    } catch (err) {
      setError('Failed to update profile. Please check your data and try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <main className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Manage Profile</h1>
        
        {isLoading && <p>Loading profile...</p>}
        {error && <p className="text-red-500 my-4">{error}</p>}
        
        {!isLoading && user && (
          isEditing ? (
            <ProfileEdit 
              user={user} 
              onSave={handleSave} 
              onCancel={() => setIsEditing(false)} 
            />
          ) : (
            <ProfileView 
              user={user} 
              onEdit={() => setIsEditing(true)} 
            />
          )
        )}
      </main>
    </div>
  );
};

export default ProfilePage;