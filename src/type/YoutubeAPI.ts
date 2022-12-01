interface YoutubeSearchResource {
    kind: string;
    etag: string;
    id: {
        kind: string;
        videoId: string;
        channelId: string;
        playlistId: string;
    };
    snippet: {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            [key: string]: {
                url: string;
                width: number;
                height: number;
            }
        },
        channelTitle: string;
    }
}

interface YoutubeSearchResult {
    kind: string;
    etag: string;
    nextPageToken: string;
    prevPageToken: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: YoutubeSearchResource[];
}

export { YoutubeSearchResult, YoutubeSearchResource };
