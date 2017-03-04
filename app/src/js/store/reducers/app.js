import { STATE_APP_SET } from 'store/actions/app.js';

const reducer = (state = {}, action = { type: null }) => {

    switch (action.type) {

        case STATE_APP_SET: {
            return Object.assign({}, state, { [action.option]: action.value });
        }

        default: {
            return state;
        }
    }
};

export default reducer;