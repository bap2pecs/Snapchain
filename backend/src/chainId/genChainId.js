import { randomIntFromInterval } from '../random/randomNum.js';

export async function genChainId() {
  // TODOs:
  // - avoid chain ids at chainlist.org
  // - avoid choosing a chainId in the local redis database

  // TODO: choose a more meaningful range. how to scale when over 100k chains
  return randomIntFromInterval(10000, 99999);
}
