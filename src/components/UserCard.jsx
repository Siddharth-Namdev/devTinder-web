import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };
  const handleRemoveSkill = (skill) => {
    const updatedSkills = user.skills.filter((s) => s !== skill);
    // Either update Redux or send PATCH directly:
    axios
      .patch(
        "/profile/edit",
        { skills: updatedSkills },
        { withCredentials: true }
      )
      .then((res) => {
        // maybe refresh user data
      });
  };

  return (
    <div className="w-full max-w-sm bg-white/60 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden transition-transform hover:scale-105 duration-300 border border-rose-200">
      <figure className="w-full h-60 overflow-hidden">
        <img
          src={photoUrl}
          alt="User"
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </figure>
      <div className="p-6 text-center space-y-3">
        <h2 className="text-2xl font-bold text-rose-700">
          {firstName + " " + lastName}
        </h2>
        {age && gender && (
          <p className="text-sm text-gray-700">
            {age} years old, {gender}
          </p>
        )}

        <p className="text-gray-600 text-sm">{about}</p>
        {user.skills && user.skills.length > 0 && (
          <div className="mt-2">
            <span className="font-semibold">Skills:</span>{" "}
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-block bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded-full mr-2 mt-1"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="px-5 py-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300"
          >
            👎 Ignore
          </button>
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="px-5 py-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-colors duration-300"
          >
            👍 Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
