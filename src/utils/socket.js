import { io } from "socket.io-client";
import { BASE_URL } from "./constants";
export const createSockerConnection = ()=>{
    return io(BASE_URL);   // this is for connect the backend 
}