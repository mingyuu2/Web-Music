const info = (message?: any) => {
    console.log(message);
};

const error = (message?: any) => {
    console.error(message);
};

const logger = {
    info,
    error
};

export default logger;
