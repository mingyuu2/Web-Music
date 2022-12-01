import express from "express";
import logger from "./logger";
import ServerConfig from "./type/ServerConfig";
import index from "./http/index";

const doHttp = async (configs: ServerConfig) => {
    const http = express();

    index.map((router) => {
        logger.info(`[HTTP] Set Router: '${router.method} ${router.path}'`);
        http[router.method](router.path, router.handler);
    });

    const httpServer = http.listen(configs.http.port);

    httpServer.on("request", (req) => {
        let { remoteAddress } = req.socket;
        const { url, method } = req;

        if (configs.reverseProxy) {
            remoteAddress = (req.headers["x-forwarded-for"] as string).split(",")[0].trim();
        }

        logger.info(`[HTTP] Handle Request from '${remoteAddress}' to '${method} ${url}'`);
    });

    httpServer.on("error", (err) => {
        logger.error(err);
    });
};

export default doHttp;
