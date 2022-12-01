import { fileURLToPath } from "url";
import { dirname } from "path";
import doHttp from "./http";
import doWebSocket from "./ws";
import { getServerConfigs } from "./configs";

const PROJECT_ROOT = dirname(fileURLToPath(import.meta.url));

const serverConfigs = await getServerConfigs();

doHttp(serverConfigs);
doWebSocket(serverConfigs);
