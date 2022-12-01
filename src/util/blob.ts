import { get, IncomingMessage } from "http";
import { get as gets } from "https";
import { createWriteStream } from "fs";

const createBlobDownloadStream = (url: string) => new Promise<IncomingMessage>((resolve) => {
    if (url.startsWith("https")) {
        gets(url, (res: IncomingMessage) => {
            resolve(res);
        });
    } else {
        get(url, (res: IncomingMessage) => {
            resolve(res);
        });
    }
});

const saveBLOBFromStream = (path: string, stream: IncomingMessage) => new Promise<void>((resolve, reject) => {
    const writeStream = createWriteStream(path);
    stream.on("data", (chunk: unknown) => {
        console.log("WRITING...");
        writeStream.write(chunk);
    });
    stream.on("end", () => {
        writeStream.close();
        resolve();
    });
    stream.on("error", (err: Error) => {
        reject(err);
    });
    writeStream.on("error", (err: Error) => {
        reject(err);
    });
});

export { createBlobDownloadStream, saveBLOBFromStream };
