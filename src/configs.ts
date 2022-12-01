import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import loadJson from "./util/load-json";
import ServerConfig from "./type/ServerConfig";
import YoutubeApiConfig from "./type/YoutubeApiConfig";

const PROJECT_ROOT = dirname(fileURLToPath(import.meta.url));
const RESOURCE_PATH = resolve(PROJECT_ROOT, "../resource");
const SERVER_CONFIG_PATH = resolve(RESOURCE_PATH, "server-configs.json");
const YOUTUBE_API_CONFIG_PATH = resolve(RESOURCE_PATH, "youtube-api-configs.json");

const getServerConfigs = async () => loadJson<ServerConfig>(SERVER_CONFIG_PATH);
const getYoutubeApiConfigs = async () => loadJson<YoutubeApiConfig>(YOUTUBE_API_CONFIG_PATH);

export { getServerConfigs, getYoutubeApiConfigs };
