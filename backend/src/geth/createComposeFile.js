export async function createComposeFile(dataDir, nodekey, port, networkId) {
  // TODO: this should be another env var instead of hardcode to always be addrs 1
  const unlock = '0x' + process.env.SEALER_ADDRESS_1;
  // TODO:
  // - password from env file
}
