import * as jspb from 'google-protobuf'



export class CreateChainRequest extends jspb.Message {
  getDepositor(): string;
  setDepositor(value: string): CreateChainRequest;

  getNonce(): number;
  setNonce(value: number): CreateChainRequest;

  getName(): string;
  setName(value: string): CreateChainRequest;

  getCurrency(): string;
  setCurrency(value: string): CreateChainRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateChainRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateChainRequest): CreateChainRequest.AsObject;
  static serializeBinaryToWriter(message: CreateChainRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateChainRequest;
  static deserializeBinaryFromReader(message: CreateChainRequest, reader: jspb.BinaryReader): CreateChainRequest;
}

export namespace CreateChainRequest {
  export type AsObject = {
    depositor: string,
    nonce: number,
    name: string,
    currency: string,
  }
}

export class DestoryChainRequest extends jspb.Message {
  getDepositor(): string;
  setDepositor(value: string): DestoryChainRequest;

  getNonce(): number;
  setNonce(value: number): DestoryChainRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DestoryChainRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DestoryChainRequest): DestoryChainRequest.AsObject;
  static serializeBinaryToWriter(message: DestoryChainRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DestoryChainRequest;
  static deserializeBinaryFromReader(message: DestoryChainRequest, reader: jspb.BinaryReader): DestoryChainRequest;
}

export namespace DestoryChainRequest {
  export type AsObject = {
    depositor: string,
    nonce: number,
  }
}

export class CreateChainReply extends jspb.Message {
  getChainId(): number;
  setChainId(value: number): CreateChainReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateChainReply.AsObject;
  static toObject(includeInstance: boolean, msg: CreateChainReply): CreateChainReply.AsObject;
  static serializeBinaryToWriter(message: CreateChainReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateChainReply;
  static deserializeBinaryFromReader(message: CreateChainReply, reader: jspb.BinaryReader): CreateChainReply;
}

export namespace CreateChainReply {
  export type AsObject = {
    chainId: number,
  }
}

