import React from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import ShimmerConnections from "./ShimmerConnections";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      // handle error case
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <div>
        <h1 className="flex justify-center my-10"> No Connection Found </h1>;
        <ShimmerConnections />
      </div>
    );

  return (
    <div className="text-center my-10 px-4">
      <h1 className="font-extrabold text-3xl text-red-700 mb-10 tracking-wide drop-shadow-md">
        Your Connections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="bg-gradient-to-br from-indigo-100 via-white to-purple-100 border border-indigo-300 rounded-3xl shadow-xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center space-x-5">
                <img
                  src={photoUrl}
                  alt={`${firstName}'s profile photo`}
                  className="w-20 h-20 rounded-full object-cover border-4 border-indigo-300 shadow-md"
                />
                <div className="text-left">
                  <h2 className="text-xl font-semibold text-indigo-900">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-sm text-indigo-700">
                      {age + " | " + gender}
                    </p>
                  )}
                  <p className="text-sm mt-2 text-gray-700 italic line-clamp-2">
                    {about}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
