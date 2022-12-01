import HttpRouter from "../type/HttpRouter";
import YtApiClient from "../youtube/youtube-api";
import { getYoutubeApiConfigs } from "../configs";
import logger from "../logger";

const search: HttpRouter = {
    method: "get",
    path: "/search",
    handler: async (req, res) => {
        const { q } = req.query;

        if (!q) {
            return res.sendStatus(400);
        }

        try {
            const { apiKey } = await getYoutubeApiConfigs();
            const client = new YtApiClient(apiKey);
            const result = await client.setSearchString(q as string).setType("video").search();

            res.json(result);
        } catch (e) {
            logger.error(e);
            res.sendStatus(500);
        }
    }
};

export default search;
