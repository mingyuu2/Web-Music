import { get } from "https";

const gets = async (url: string) => new Promise<string>((resolve, reject) => {
    get(url, (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
            return reject(new Error(`HTTP Status Code ${res.statusCode}`));
        }

        const body: Uint8Array[] = [];

        res.on("data", (chunk) => {
            body.push(chunk);
        });

        res.on("error", (err) => reject(err));

        res.on("end", () => {
            try {
                const str = Buffer.concat(body).toString();
                return resolve(str);
            } catch (e) {
                reject(e);
            }
        });
    });
});

export { gets };
