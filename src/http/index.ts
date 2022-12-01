import HttpRouter from "../type/HttpRouter";
import search from "./search";
import audio from "./audio";
import roomCreate from "./room-create";
import roomPlaylist from "./room-playlist";
import roomUsers from "./room-users";

const index: HttpRouter[] = [
    search,
    audio,
    roomCreate,
    roomPlaylist,
    roomUsers
];

export default index;
