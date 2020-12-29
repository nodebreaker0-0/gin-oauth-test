import * as networkActions from '../actions/_networkStatus';
import { nodeStatusData } from '@config/nodeInfo'

const initialStates = {
    networksData: nodeStatusData,
}

const reducers = (state = initialStates, action) => {
    const { type, payload } = action;
    switch (type) {
        case networkActions.setNetworksData().type: {
            return {
                ...state,
                networksData: payload
            }
        }

        default: {
            return state;
        }
    }
}

export default reducers;