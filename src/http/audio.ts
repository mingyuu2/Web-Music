import HttpRouter from "../type/HttpRouter";
import { getAudioInformation } from "../youtube/youtube-dl";
import logger from "../logger";

const audio: HttpRouter = {
    method: "get",
    path: "/audio",
    handler: async (req, res) => {
        const { url } = req.query;

        if (!url) {
            res.sendStatus(400);
        }

        try {
            const info = await getAudioInformation(url as string);
            res.json(info);
        } catch (e) {
            logger.error(e);
            res.sendStatus(500);
        }
    }
};

export default audio;
