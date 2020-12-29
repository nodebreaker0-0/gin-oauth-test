// Action types
export const SET_NETWORKS_DATA = 'network/setNetworksData';

// Action creators
export const setNetworksData = (data) => {
    return {
        type: SET_NETWORKS_DATA, payload: data
    }
};