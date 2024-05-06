export const compose = (...fns) => {
    return (payload) => {
        return fns.reduce((buf, fn) => {
            return fn(buf);
        }, payload);
    };
};
