import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { useState } from "react";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [isEditing, setIsEditing] = useState(false);

  return (
    user && (
      <div className="min-h-screen bg-base-200/30 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Profile Card */}
          <div className="bg-base-100 shadow-xl rounded-lg overflow-hidden">
            {/* Profile Header */}
            <div className="relative">
              <div className="h-32 bg-primary/10"></div>
              <div className="absolute -bottom-12 w-full px-8 flex items-end">
                <img
                  src={user.photoUrl}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-base-100 shadow-lg object-cover"
                />
                <div className="ml-6 pb-4">
                  <h1 className="text-2xl font-serif">{user.firstName} {user.lastName}</h1>
                  <p className="text-sm text-gray-500">{user.college}</p>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="mt-16 p-8">
              {isEditing ? (
                <EditProfile user={user} onClose={() => setIsEditing(false)} />
              ) : (
                <div className="space-y-8">
                  {/* About */}
                  <div className="border-b border-base-300 pb-6">
                    <h2 className="text-lg font-serif mb-4">About</h2>
                    <p className="text-gray-500 leading-relaxed">
                      {user.about || "Tell us about yourself..."}
                    </p>
                  </div>

                  {/* Contact Details */}
                  <div className="border-b border-base-300 pb-6">
                    <h2 className="text-lg font-serif mb-4">Contact Information</h2>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="w-24 text-gray-500">Email</span>
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24 text-gray-500">Phone</span>
                        <span>{user.number}</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-serif">Skills & Expertise</h2>
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="text-primary hover:underline text-sm"
                      >
                        Add Skills
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {user.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-1.5 bg-base-200 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      )) || (
                        <p className="text-gray-500 italic">Add your professional skills</p>
                      )}
                    </div>
                  </div>

                  {/* Edit Button */}
                  <div className="pt-6 text-center">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn btn-outline btn-wide"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
