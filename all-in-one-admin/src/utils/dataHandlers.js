import { nodeStatusData, chains, valiAddresses as VA } from '@config/nodeInfo';
import { getNodeStatus, getValidatorSignInfo } from '@config/proto3';


export function getIntervalChainData(reduxDataSet) {

    //variable to gather gRPC responses
    let originNetworkData = JSON.parse(JSON.stringify(nodeStatusData))

    // get and set gRPC responses at networkData variable
    setInterval(() => {
        for (const item in chains) {
            let isSignInfoUpdated = false
            chains[item].forEach(info => {
                let tcpAddress = `tcp://${info.ip}:26657`
                if (info.port) {
                    tcpAddress = `tcp://${info.ip}:${info.port}`
                }
                getNodeStatus(tcpAddress, `${item}/${info.nodeName}`, originNetworkData.main.nodeStatus)
                if (!isSignInfoUpdated && info.nodeName.includes('s.')) {
                    getValidatorSignInfo(tcpAddress, VA[item], `${item}/${info.nodeName}`, originNetworkData.main.nodeStatus)
                    isSignInfoUpdated = true
                }
            });
        }
    }, 3000)

    //set redux store data
    setInterval(() => {
        // check node status
        for (let network in originNetworkData.main.nodeStatus) {
            let isAllOk = true
            let error = false
            for (let nodeName in originNetworkData.main.nodeStatus[network].nodes) {
                let node = originNetworkData.main.nodeStatus[network].nodes[nodeName]
                if (node.catching_up !== false) {
                    isAllOk = false
                    error = true
                }
            }
            originNetworkData.main.nodeStatus[network].isAllOk = isAllOk
            originNetworkData.main.overview.networks[network].error = error
        }

        const newNetworkDataStatus = JSON.parse(JSON.stringify(originNetworkData))
        reduxDataSet(newNetworkDataStatus)
    }, 5000)
}