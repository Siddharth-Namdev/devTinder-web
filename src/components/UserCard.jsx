const UserCard = ({ user, onInterested, onIgnored }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="w-80 bg-gradient-to-br from-white to-sky-50 shadow-lg rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300">
      <div className="h-64 w-full overflow-hidden">
        <img
          src={photoUrl || "https://avatars.githubusercontent.com/u/9919?v=4"}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="p-5 space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">
            {firstName} {lastName}
          </h2>
          <span className="text-sm text-sky-600 font-medium">
            {age || 25} yrs
          </span>
        </div>

        <p className="text-sm text-gray-600">
          <span className="font-semibold capitalize">{gender || "NA"}</span> |
          Dev Enthusiast
        </p>

        <p className="text-sm text-gray-700 line-clamp-3">{about}</p>

        <div className="flex justify-between pt-3">
          <button
            onClick={() => onIgnored(user)}
            className="btn btn-outline btn-error btn-sm rounded-full w-[48%]"
          >
            👎 Ignore
          </button>
          <button
            onClick={() => onInterested(user)}
            className="btn btn-primary btn-sm rounded-full w-[48%]"
          >
            👍 Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
