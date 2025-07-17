import { useState } from "react";
import UserCard from "./userCard";
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
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
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
            <label className="block mb-3">
              <span className=" font-medium">Gender:</span>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
              />
            </label>

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
              user={{ firstName, lastName, photoUrl, age, gender, about }}
            />
          </div>
          {/* Preview Card */}
        </div>

        {/* Toast */}
        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert bg-green-500 text-white shadow-lg">
              <span>Profile saved successfully.</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfile;
