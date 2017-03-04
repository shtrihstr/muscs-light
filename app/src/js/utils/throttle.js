
const throttle = (callback, delay = 250) => {
    let wait = false;
    let timer = null;

    return (...args) => {

        if (!wait) {
            wait = true;

            callback.apply(this, args);

            clearTimeout(timer);
            timer = setTimeout(() => wait = false, delay);
        }
    };
};

export default throttle;