import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    photoUrl: user.photoUrl,
    about: user.about || "",
    skills: user.skills || []
  });
  const [newSkill, setNewSkill] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    setError("");
    try {
      if (!formData.firstName || !formData.lastName || !formData.photoUrl) {
        setError("Please fill in all required fields");
        return;
      }

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          ...formData,
          skills: formData.skills || [],
        },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (res?.data?.success) {  // Added optional chaining
        dispatch(addUser(res.data.data));
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          onClose?.();
        }, 2000);
      } else {
        // More detailed error message
        setError(res?.data?.message || "Failed to update profile. Please try again.");
      }
    } catch (err) {
      // Improved error handling
      const errorMessage = err.response?.data?.message || err.message || "An error occurred while updating profile";
      setError(errorMessage);
      console.error("Profile update error:", err);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
      <div className="flex-1 bg-base-100 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-serif mb-6 text-center">Edit Your Profile</h2>
        
        <div className="space-y-4">
          {/* Basic Information */}
          <div className="border-b border-base-300 pb-6">
            <h3 className="text-lg font-medium mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input input-bordered focus:input-primary"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input input-bordered focus:input-primary"
                />
              </div>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="border-b border-base-300 pb-6">
            <h3 className="text-lg font-medium mb-4">Profile Picture</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                className="input input-bordered focus:input-primary"
              />
            </div>
          </div>

          {/* About */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">About</span>
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="textarea textarea-bordered h-24 focus:textarea-primary"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Skills Section */}
          <div className="border-t border-base-300 pt-6">
            <h3 className="text-lg font-medium mb-4">Skills</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  className="input input-bordered focus:input-primary flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <button 
                  className="btn btn-primary"
                  onClick={handleAddSkill}
                >
                  Add
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="badge badge-primary gap-1">
                    {skill}
                    <button 
                      onClick={() => handleRemoveSkill(skill)}
                      className="btn btn-ghost btn-xs px-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {error && <p className="text-error text-sm mt-2">{error}</p>}

          <div className="flex justify-end gap-3 mt-6">
            <button 
              className="btn btn-ghost"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              className="btn btn-primary"
              onClick={saveProfile}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="md:w-80">
        <div className="sticky top-4">
          <h3 className="text-lg font-medium mb-4">Preview</h3>
          <UserCard user={formData} />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center animate-fadeIn">
          <div className="alert alert-success shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Profile updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
