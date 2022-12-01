import { WebSocket, WebSocketServer } from "ws";
import { IncomingMessage } from "http";
import logger from "./logger";
import ServerConfig from "./type/ServerConfig";

const doWebSocket = async (configs: ServerConfig) => {
    const ws = new WebSocketServer({
        port: configs.ws.port
    });

    ws.on("connection", (socket: WebSocket, req: IncomingMessage) => {
        let { remoteAddress } = req.socket;

        if (configs.reverseProxy) {
            remoteAddress = (req.headers["x-forwarded-for"] as string).split(",")[0].trim();
        }

        logger.info(`[WS] Connection Created with '${remoteAddress}'`);
    });

    ws.on("error", (err) => {
        logger.error(err);
    });
};

export default doWebSocket;
