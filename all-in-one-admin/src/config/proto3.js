import { clientIP } from './nodeInfo'
const { StatusRequest, SignInfoRequest } = require('./proto3/monitoring_pb.js');
const { MonitoringClient } = require('./proto3/monitoring_grpc_web_pb.js');
const monitoringService = new MonitoringClient(clientIP);
const StatusReq = new StatusRequest();

export function getNodeStatus(uri, nodeTag, data) {
    const requestInfo = StatusReq.setNodeuri(uri);
    const requestTime = new Date()
    monitoringService.getnodeStatus(requestInfo, {}, function (err, response) {
        const responseTime = new Date()
        const timeSpent = responseTime - requestTime
        if (response) {
            let parsedArray = JSON.parse(response.array)
            parsedArray.moniker = `${nodeTag?.split('/')[1]}\n(${timeSpent}ms)`

            let monikerReplacedResponse = parsedArray
            data[nodeTag?.split('/')[0]].nodes[nodeTag?.split('/')[1]] = monikerReplacedResponse
        } else {
            // console.log(err)
            data[nodeTag?.split('/')[0]].nodes[nodeTag?.split('/')[1]] = { "latest_block_height": err.message, "catching_up": 'code:' + err.code, "moniker": `${nodeTag?.split('/')[1]}\n(${timeSpent}ms)` }
        }
    })
}

export function getValidatorSignInfo(uri, vali_address, nodeTag, data) {
    let signInfo = new SignInfoRequest();
    signInfo.setValidatorAddress(vali_address)
    signInfo.setNodeuri(uri)
    monitoringService.getvalidatorSignInfo(signInfo, {}, function (err, response) {
        if (response) {
            let res = JSON.parse(response.array[0])
            data[nodeTag?.split('/')[0]].isSign = res.SignInfo
            // console.log(data[nodeTag?.split('/')[0]].name, data[nodeTag?.split('/')[0]].isSign)
        } else {
            console.log(err)
        }
    })
}