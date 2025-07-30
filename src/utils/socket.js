import { io } from "socket.io-client";
import { BASE_URL } from "./constants";
export const createSockerConnection = () => {
  // this is for connect the backend
   if (location.hostname === "localhost") {
    return io(BASE_URL); // this is for locathost
  } else {
    return io("/", { path: "/api/socket.io" });  // this is for production
  }
//return io(BASE_URL); 
};
