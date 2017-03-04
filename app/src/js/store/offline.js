import { setAppState } from 'store/actions/app'

export const getInitialState = () => {
    return {
        app: {
            offline: !!window && !!window.navigator ? !window.navigator.onLine : false
        }
    };
};

export const registerStoreWatcher = (store) => {
    window.addEventListener('offline', () => {
        store.dispatch(setAppState('offline', true));
    });

    window.addEventListener('online', () => {
        store.dispatch(setAppState('offline', false));
    });
};


