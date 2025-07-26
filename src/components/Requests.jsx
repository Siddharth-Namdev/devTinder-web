import React from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useState } from "react";
import RequestsShimmer from "./RequestsShimmer";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [showButtons, setShowButtons] = useState();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {}, // in post call , this should be empty , important !
        { withCredentials: true }
      );

      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error in review request samjha... ", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/received",
        {
        withCredentials: true,
      });
      // console.log(res.data.data);
      // console.log(addRequests(res.data.data));
      dispatch(addRequest(res.data.data));
    } catch (err) {
      // handle error TODO
      console.error("Heyy error", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <div>
        <h1 className="flex justify-center my-10 text-3xl text-red-700 font-extrabold">
          {" "}
          No Request Found{" "}
        </h1>
        <RequestsShimmer />
      </div>
    );

  return (
    <div className="text-center my-10 px-4">
      <h1 className="font-extrabold text-4xl text-indigo-500 mb-10 tracking-wide">
        Requests
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="bg-gradient-to-br from-indigo-100 via-white to-purple-100 border border-indigo-200 rounded-3xl shadow-md p-6"
            >
              <div className="flex items-center space-x-5 mb-4">
                <img
                  src={photoUrl}
                  alt={`${firstName}'s profile`}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                />
                <div className="text-left">
                  <h2 className="font-bold text-xl text-indigo-800">
                    {firstName} {lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-sm text-gray-700">
                      {age} years, {gender}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">{about}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 text-sm rounded-lg bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
