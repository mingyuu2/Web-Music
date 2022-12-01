import { gets } from "../util/get";
import { YoutubeSearchResult } from "../type/YoutubeAPI";
import logger from "../logger";

class YtApiClient {
    public static readonly ENDPOINT_URL = "https://www.googleapis.com/youtube/v3/search";

    public static readonly ENDPOINT_METHOD = "GET";

    private readonly apiKey: string;

    private searchString: string;

    private type: "channel" | "playlist" | "video";

    public constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    public setSearchString(searchString: string) {
        this.searchString = searchString;
        return this;
    }

    public setType(type: "channel" | "playlist" | "video") {
        this.type = type;
        return this;
    }

    public async search() {
        const url = this.createURL();
        logger.info(`[Youtube API] Execute API: ${url}`);
        const raw = await gets(url);
        return JSON.parse(raw) as YoutubeSearchResult;
    }

    private isAllParameterSet() {
        if (!this.search()) {
            return false;
        }

        if (!this.type) {
            return false;
        }

        return true;
    }

    private createURL() {
        if (!this.isAllParameterSet()) {
            throw new Error("Not Every Parameter Set.");
        }

        return `${YtApiClient.ENDPOINT_URL}?key=${this.apiKey}&type=${this.type}&q=${this.searchString}`;
    }
}

export default YtApiClient;
