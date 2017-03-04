export const STATE_APP_SET = 'STATE_APP_SET';

export const setAppState = (option, value) => {
    return {
        option,
        value,
        type: STATE_APP_SET
    }
};



