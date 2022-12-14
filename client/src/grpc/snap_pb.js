// source: snap.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require("google-protobuf");
var goog = jspb;
var global =
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof window !== "undefined" && window) ||
  (typeof global !== "undefined" && global) ||
  (typeof self !== "undefined" && self) ||
  function() {
    return this;
  }.call(null) ||
  Function("return this")();

goog.exportSymbol("proto.snap.CreateChainReply", null, global);
goog.exportSymbol("proto.snap.CreateChainRequest", null, global);
goog.exportSymbol("proto.snap.DestoryChainRequest", null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} optData Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snap.CreateChainRequest = function(optData) {
  jspb.Message.initialize(this, optData, 0, -1, null, null);
};
goog.inherits(proto.snap.CreateChainRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.snap.CreateChainRequest.displayName = "proto.snap.CreateChainRequest";
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} optData Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snap.DestoryChainRequest = function(optData) {
  jspb.Message.initialize(this, optData, 0, -1, null, null);
};
goog.inherits(proto.snap.DestoryChainRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.snap.DestoryChainRequest.displayName = "proto.snap.DestoryChainRequest";
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} optData Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snap.CreateChainReply = function(optData) {
  jspb.Message.initialize(this, optData, 0, -1, null, null);
};
goog.inherits(proto.snap.CreateChainReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.snap.CreateChainReply.displayName = "proto.snap.CreateChainReply";
}

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} optIncludeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.snap.CreateChainRequest.prototype.toObject = function(optIncludeInstance) {
    return proto.snap.CreateChainRequest.toObject(optIncludeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.snap.CreateChainRequest} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.snap.CreateChainRequest.toObject = function(includeInstance, msg) {
    var f;
    var obj = {
      currency: jspb.Message.getFieldWithDefault(msg, 4, ""),
      depositor: jspb.Message.getFieldWithDefault(msg, 1, ""),
      name: jspb.Message.getFieldWithDefault(msg, 3, ""),
      nonce: jspb.Message.getFieldWithDefault(msg, 2, 0),
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snap.CreateChainRequest}
 */
proto.snap.CreateChainRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snap.CreateChainRequest();
  return proto.snap.CreateChainRequest.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snap.CreateChainRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snap.CreateChainRequest}
 */
proto.snap.CreateChainRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    var value;
    switch (field) {
      case 1:
        value = /** @type {string} */ (reader.readString());
        msg.setDepositor(value);
        break;
      case 2:
        value = /** @type {number} */ (reader.readInt32());
        msg.setNonce(value);
        break;
      case 3:
        value = /** @type {string} */ (reader.readString());
        msg.setName(value);
        break;
      case 4:
        value = /** @type {string} */ (reader.readString());
        msg.setCurrency(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snap.CreateChainRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.snap.CreateChainRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.snap.CreateChainRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.snap.CreateChainRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDepositor();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
  f = message.getNonce();
  if (f !== 0) {
    writer.writeInt32(2, f);
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(3, f);
  }
  f = message.getCurrency();
  if (f.length > 0) {
    writer.writeString(4, f);
  }
};

/**
 * optional string depositor = 1;
 * @return {string}
 */
proto.snap.CreateChainRequest.prototype.getDepositor = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};

/**
 * @param {string} value
 * @return {!proto.snap.CreateChainRequest} returns this
 */
proto.snap.CreateChainRequest.prototype.setDepositor = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional int32 nonce = 2;
 * @return {number}
 */
proto.snap.CreateChainRequest.prototype.getNonce = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};

/**
 * @param {number} value
 * @return {!proto.snap.CreateChainRequest} returns this
 */
proto.snap.CreateChainRequest.prototype.setNonce = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};

/**
 * optional string name = 3;
 * @return {string}
 */
proto.snap.CreateChainRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};

/**
 * @param {string} value
 * @return {!proto.snap.CreateChainRequest} returns this
 */
proto.snap.CreateChainRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};

/**
 * optional string currency = 4;
 * @return {string}
 */
proto.snap.CreateChainRequest.prototype.getCurrency = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};

/**
 * @param {string} value
 * @return {!proto.snap.CreateChainRequest} returns this
 */
proto.snap.CreateChainRequest.prototype.setCurrency = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} optIncludeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.snap.DestoryChainRequest.prototype.toObject = function(optIncludeInstance) {
    return proto.snap.DestoryChainRequest.toObject(optIncludeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.snap.DestoryChainRequest} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.snap.DestoryChainRequest.toObject = function(includeInstance, msg) {
    var f;
    var obj = {
      depositor: jspb.Message.getFieldWithDefault(msg, 1, ""),
      nonce: jspb.Message.getFieldWithDefault(msg, 2, 0),
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snap.DestoryChainRequest}
 */
proto.snap.DestoryChainRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snap.DestoryChainRequest();
  return proto.snap.DestoryChainRequest.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snap.DestoryChainRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snap.DestoryChainRequest}
 */
proto.snap.DestoryChainRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    var value;
    switch (field) {
      case 1:
        value = /** @type {string} */ (reader.readString());
        msg.setDepositor(value);
        break;
      case 2:
        value = /** @type {number} */ (reader.readInt32());
        msg.setNonce(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snap.DestoryChainRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.snap.DestoryChainRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.snap.DestoryChainRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.snap.DestoryChainRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDepositor();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
  f = message.getNonce();
  if (f !== 0) {
    writer.writeInt32(2, f);
  }
};

/**
 * optional string depositor = 1;
 * @return {string}
 */
proto.snap.DestoryChainRequest.prototype.getDepositor = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};

/**
 * @param {string} value
 * @return {!proto.snap.DestoryChainRequest} returns this
 */
proto.snap.DestoryChainRequest.prototype.setDepositor = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};

/**
 * optional int32 nonce = 2;
 * @return {number}
 */
proto.snap.DestoryChainRequest.prototype.getNonce = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};

/**
 * @param {number} value
 * @return {!proto.snap.DestoryChainRequest} returns this
 */
proto.snap.DestoryChainRequest.prototype.setNonce = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} optIncludeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.snap.CreateChainReply.prototype.toObject = function(optIncludeInstance) {
    return proto.snap.CreateChainReply.toObject(optIncludeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.snap.CreateChainReply} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.snap.CreateChainReply.toObject = function(includeInstance, msg) {
    var f;
    var obj = {
      chainId: jspb.Message.getFieldWithDefault(msg, 1, 0),
    };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snap.CreateChainReply}
 */
proto.snap.CreateChainReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snap.CreateChainReply();
  return proto.snap.CreateChainReply.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snap.CreateChainReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snap.CreateChainReply}
 */
proto.snap.CreateChainReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {number} */ (reader.readInt32());
        msg.setChainId(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snap.CreateChainReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.snap.CreateChainReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.snap.CreateChainReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.snap.CreateChainReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getChainId();
  if (f !== 0) {
    writer.writeInt32(1, f);
  }
};

/**
 * optional int32 chain_id = 1;
 * @return {number}
 */
proto.snap.CreateChainReply.prototype.getChainId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};

/**
 * @param {number} value
 * @return {!proto.snap.CreateChainReply} returns this
 */
proto.snap.CreateChainReply.prototype.setChainId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};

goog.object.extend(exports, proto.snap);
