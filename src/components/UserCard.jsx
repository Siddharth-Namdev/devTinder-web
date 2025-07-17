// const UserCard = ({ user, onInterested, onIgnored }) => {
//   const { firstName, lastName, photoUrl, age, gender, about } = user;

//   return (
//     <div className="w-80 bg-gradient-to-br from-white to-sky-50 shadow-lg rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300">
//       <div className="h-64 w-full overflow-hidden">
//         <img
//           src={photoUrl || "https://avatars.githubusercontent.com/u/9919?v=4"}
//           alt={`${firstName} ${lastName}`}
//           className="w-full h-full object-cover object-center"
//         />
//       </div>

//       <div className="p-5 space-y-2">
//         <div className="flex items-center justify-between">
//           <h2 className="text-lg font-bold text-gray-800">
//             {firstName} {lastName}
//           </h2>
//           <span className="text-sm text-sky-600 font-medium">
//             {age || 25} yrs
//           </span>
//         </div>

//         <p className="text-sm text-gray-600">
//           <span className="font-semibold capitalize">{gender || "NA"}</span> |
//           Dev Enthusiast
//         </p>

//         <p className="text-sm text-gray-700 line-clamp-3">{about}</p>

//         <div className="flex justify-between pt-3">
//           <button
//             onClick={() => onIgnored(user)}
//             className="btn btn-outline btn-error btn-sm rounded-full w-[48%]"
//           >
//             👎 Ignore
//           </button>
//           <button
//             onClick={() => onInterested(user)}
//             className="btn btn-primary btn-sm rounded-full w-[48%]"
//           >
//             👍 Interested
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
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
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="px-5 py-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300"
          >
            Ignore
          </button>
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="px-5 py-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-colors duration-300"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
