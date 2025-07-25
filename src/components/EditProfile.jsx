import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [skills, setSkills] = useState(user?.skills || []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const allSkills = [
    "Frontend",
    "Backend",
    "Full Stack",
    "React",
    "Node.js",
    "MongoDB",
    "DevOps",
    "Java",
    "C++",
    "ML/AI",
  ];

  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data || "Something went wrong.");
    }
  };

  return (
    <>
      <div className=" min-h-screen overflow-y-scroll scrollbar-hide bg-gradient-to-br text-black from-blue-100 via-white to-indigo-100 py-10">
        <div className="flex flex-col lg:flex-row justify-center items-start gap-10 px-4 ">
          {/* Edit Form */}
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-indigo-700 text-center mb-4">
              Edit Profile
            </h2>

            {/* First Name */}
            <label className="block mb-3">
              <span className=" font-medium">First Name:</span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
              />
            </label>

            {/* Last Name */}
            <label className="block mb-3">
              <span className=" font-medium">Last Name:</span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
              />
            </label>

            {/* Photo URL */}
            <label className="block mb-3">
              <span className=" font-medium">Photo URL:</span>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
              />
            </label>

            {/* Age */}
            <label className="block mb-3">
              <span className=" font-medium">Age:</span>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
              />
            </label>

            {/* Gender */}
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 bg-white text-gray-800"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills
              </label>

              <div
                className="border border-gray-300 rounded-md p-2 cursor-pointer bg-white"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {skills.length === 0 ? (
                  <span className="text-gray-400">Click to add skill</span>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs flex items-center gap-1"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSkills(skills.filter((s) => s !== skill));
                          }}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          ❌
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {isDropdownOpen && (
                <div className="mt-2 border rounded bg-white shadow-md z-10">
                  {allSkills
                    .filter((s) => !skills.includes(s))
                    .map((skill, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                        onClick={() => {
                          setSkills([...skills, skill]);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {skill}
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* About */}
            <label className="block mb-4">
              <span className=" font-medium">About:</span>
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
              />
            </label>

            {/* Error */}
            {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

            {/* Save Button */}
            <div className="flex justify-center">
              <button
                onClick={saveProfile}
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition"
              >
                Save Profile
              </button>
            </div>
          </div>
          <div className="p-10">
            <UserCard
              user={{
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
                skills,
              }}
            />
          </div>
          {/* Preview Card */}
        </div>

        {/* Toast */}
        {showToast && (
          <div className="fixed z-[9999] top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg">
              Profile saved successfully.
            </div>
          </div>
        )}
        {user.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {user.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs flex items-center gap-1"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfile;
