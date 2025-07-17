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
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={user.photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;