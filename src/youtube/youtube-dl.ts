import youtube from "youtube-dl-exec";
import logger from "../logger";

interface YtFormat {
    asr: number,
    filesize: number,
    format_id: string,
    format_note: string,
    fps: number,
    height: number,
    quality: number,
    tbr: number,
    vbr?: number,
    url: string,
    manifest_url: string,
    width: number,
    ext: string,
    vcodec: string,
    acodec: string,
    abr: number,
    downloader_options: unknown,
    container: string,
    format: string,
    protocol: string,
    http_headers: unknown,
    resolution: string
}

interface YtAudioInfo {
    m4a: YtFormat[];
    webm: YtFormat[];
    id: string;
    title: string;
    channel: string;
    channelURL: string;
    duration: number;
    thumbnailURL: string;
    url: string;
}

const getAudioInformation = async (url: string): Promise<YtAudioInfo> => {
    logger.info(`Fetching Information about '${url}'`);

    const {
        formats,
        thumbnail,
        channel,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        channel_url,
        duration,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        webpage_url,
        title,
        id
    } = await youtube(url, {
        dumpSingleJson: true,
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        addHeader: [
            "referer:youtube.com",
            "user-agent:googlebot"
        ]
    });

    const audioFormats = formats
        .filter((format) => (format as YtFormat).resolution == "audio only");

    const m4a = audioFormats.filter((format) => format.ext === "m4a")
        .sort((a, b) => b.quality - a.quality) as YtFormat[];

    const webm = audioFormats.filter((format) => format.ext === "webm")
        .sort((a, b) => b.quality - a.quality) as YtFormat[];

    logger.info(`Information Fetched: ${title} (${channel})`);

    return {
        m4a,
        webm,
        id,
        title,
        channel,
        // eslint-disable-next-line camelcase
        channelURL: channel_url,
        duration,
        thumbnailURL: thumbnail,
        // eslint-disable-next-line camelcase
        url: webpage_url
    };
};

export { getAudioInformation };
