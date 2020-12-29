/**
 * @fileoverview gRPC-Web generated client stub for monitoring
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.monitoring = require('./monitoring_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.monitoring.MonitoringClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.monitoring.MonitoringPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.monitoring.StatusRequest,
 *   !proto.monitoring.StatusResponse>}
 */
const methodDescriptor_Monitoring_GetnodeStatus = new grpc.web.MethodDescriptor(
  '/monitoring.Monitoring/GetnodeStatus',
  grpc.web.MethodType.UNARY,
  proto.monitoring.StatusRequest,
  proto.monitoring.StatusResponse,
  /**
   * @param {!proto.monitoring.StatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.monitoring.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.monitoring.StatusRequest,
 *   !proto.monitoring.StatusResponse>}
 */
const methodInfo_Monitoring_GetnodeStatus = new grpc.web.AbstractClientBase.MethodInfo(
  proto.monitoring.StatusResponse,
  /**
   * @param {!proto.monitoring.StatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.monitoring.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.monitoring.StatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.monitoring.StatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.monitoring.StatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.monitoring.MonitoringClient.prototype.getnodeStatus =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/monitoring.Monitoring/GetnodeStatus',
      request,
      metadata || {},
      methodDescriptor_Monitoring_GetnodeStatus,
      callback);
};


/**
 * @param {!proto.monitoring.StatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.monitoring.StatusResponse>}
 *     Promise that resolves to the response
 */
proto.monitoring.MonitoringPromiseClient.prototype.getnodeStatus =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/monitoring.Monitoring/GetnodeStatus',
      request,
      metadata || {},
      methodDescriptor_Monitoring_GetnodeStatus);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.monitoring.SignInfoRequest,
 *   !proto.monitoring.SignInfoResponse>}
 */
const methodDescriptor_Monitoring_GetvalidatorSignInfo = new grpc.web.MethodDescriptor(
  '/monitoring.Monitoring/GetvalidatorSignInfo',
  grpc.web.MethodType.UNARY,
  proto.monitoring.SignInfoRequest,
  proto.monitoring.SignInfoResponse,
  /**
   * @param {!proto.monitoring.SignInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.monitoring.SignInfoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.monitoring.SignInfoRequest,
 *   !proto.monitoring.SignInfoResponse>}
 */
const methodInfo_Monitoring_GetvalidatorSignInfo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.monitoring.SignInfoResponse,
  /**
   * @param {!proto.monitoring.SignInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.monitoring.SignInfoResponse.deserializeBinary
);


/**
 * @param {!proto.monitoring.SignInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.monitoring.SignInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.monitoring.SignInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.monitoring.MonitoringClient.prototype.getvalidatorSignInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/monitoring.Monitoring/GetvalidatorSignInfo',
      request,
      metadata || {},
      methodDescriptor_Monitoring_GetvalidatorSignInfo,
      callback);
};


/**
 * @param {!proto.monitoring.SignInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.monitoring.SignInfoResponse>}
 *     Promise that resolves to the response
 */
proto.monitoring.MonitoringPromiseClient.prototype.getvalidatorSignInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/monitoring.Monitoring/GetvalidatorSignInfo',
      request,
      metadata || {},
      methodDescriptor_Monitoring_GetvalidatorSignInfo);
};


module.exports = proto.monitoring;

