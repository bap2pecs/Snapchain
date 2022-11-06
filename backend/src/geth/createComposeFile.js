import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import { dirName } from "../utils/dirName.js";
import { replaceStringArray } from "./replaceStringArray.js";

export async function createComposeFile(dataDir, nodeKey, port, httpPort, networkId, nodeName, enodeUrl = undefined) {
  // TODO: fix this hack
  let unlockAddress = "0x";
  let template = "";
  let serviceName = "";
  if (nodeName === "node1") {
    unlockAddress += process.env.SEALER_ADDRESS_1;
    template = process.env.COMPOSE_TEMPLATE;
    serviceName = "geth_one";
  } else {
    unlockAddress += process.env.SEALER_ADDRESS_2;
    template = process.env.COMPOSE_TEMPLATE_2;
    serviceName = "geth_two";
  }
  try {
    const content = fs.readFileSync(path.resolve(dirName(import.meta.url), template));
    const doc = yaml.load(content);

    const pairs = {
      "<datadir>": dataDir,
      "<nodekey>": nodeKey,
      "<port>": port,
      "<httpport>": httpPort,
      "<networkid>": networkId,
      "<unlock>": unlockAddress,
      "<password>": process.env.PASSWORD_FILE,
      "<enodeUrl>": enodeUrl,
    };

    // TODO: here we have assumptions on the structure of the yml file. not
    // sure how to fix it though
    doc.services[serviceName].command = replaceStringArray(doc.services[serviceName].command, pairs);
    doc.services[serviceName].ports = replaceStringArray(doc.services[serviceName].ports, pairs);
    doc.services[serviceName].volumes = replaceStringArray(doc.services[serviceName].volumes, pairs);

    // support Apple chips
    if (process.env.IS_APPLE_CHIP === "true") {
      doc.services[serviceName].platform = "linux/arm64";
    }

    const composeFile = dataDir + "/docker-compose.yml";
    fs.writeFile(composeFile, yaml.dump(doc), (err) => {
      if (err) {
        console.log(err);
      }
    });
    return composeFile;
  } catch (e) {
    console.log(e);
  }
}
