/**
 * @fileoverview gRPC-Web generated client stub for snap
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v3.21.9
// source: snap.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as snap_pb from './snap_pb';


export class SnapClient {
  public client_: grpcWeb.AbstractClientBase;
  public hostname_: string;
  public credentials_: null | { [index: string]: string; };
  public options_: null | { [index: string]: any; };

  public methodDescriptorCreateChain = new grpcWeb.MethodDescriptor(
    '/snap.Snap/CreateChain',
    grpcWeb.MethodType.UNARY,
    snap_pb.CreateChainRequest,
    snap_pb.CreateChainReply,
    (request: snap_pb.CreateChainRequest) => {
      return request.serializeBinary();
    },
    snap_pb.CreateChainReply.deserializeBinary
  );

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) {
      options = {};
    }
    if (!credentials) {
      credentials = {};
    }
    options.format = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  public createChain(
    request: snap_pb.CreateChainRequest,
    metadata: grpcWeb.Metadata | null): Promise<snap_pb.CreateChainReply>;

  public createChain(
    request: snap_pb.CreateChainRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: snap_pb.CreateChainReply) => void): grpcWeb.ClientReadableStream<snap_pb.CreateChainReply>;

  public createChain(
    request: snap_pb.CreateChainRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: snap_pb.CreateChainReply) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/snap.Snap/CreateChain',
        request,
        metadata || {},
        this.methodDescriptorCreateChain,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/snap.Snap/CreateChain',
    request,
    metadata || {},
    this.methodDescriptorCreateChain);
  }

}

