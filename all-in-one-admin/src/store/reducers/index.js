import { combineReducers } from 'redux';

import networkStatus from './networkStatus';

const rootReducer = combineReducers({
    networkStatus,
});

export default rootReducer;