import { combineReducers } from 'redux';
import apollo from 'store/apollo';
import app from 'store/reducers/app';

const reducer = combineReducers({
    app,
    apollo: apollo.reducer()
});

export default reducer;