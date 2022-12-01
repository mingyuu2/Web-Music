import { PathLike, promises as fs } from "fs";

const loadJson = async <T>(path: PathLike): Promise<T> => {
    const raw = await fs.readFile(path);
    return JSON.parse(raw.toString()) as T;
};

export default loadJson;
