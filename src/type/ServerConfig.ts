interface ServerConfig {
    http: {
        port: number
    },
    ws: {
        port: number
    },
    reverseProxy: boolean
}

export default ServerConfig;
