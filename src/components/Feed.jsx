import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
      //console.log(res);
    } catch (err) {}
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if(feed.length <= 0) return (
  <h1 className="flex justify-center my-10 text-rose-600 text-xl font-semibold">
    No more user found!
  </h1>
)

return (
  feed && (
    <div className="flex justify-center my-10">
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-rose-100">
        <UserCard user={feed[0]} />
      </div>
    </div>
  )
);

};

export default Feed;
