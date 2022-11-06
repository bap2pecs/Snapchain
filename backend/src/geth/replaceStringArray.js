/*
arr is an array of strings. examples:
[
  '--syncmode=full',
  '--datadir=<datadir>',
  '--nodekey=<nodekey>',
  '--port=<port>',
  '--http',
  '--http.addr=0.0.0.0',
  '--http.port=<httpport>',
  '--networkid=<networkid>',
  '--mine',
  '--miner.threads=1',
  '--miner.gasprice=1',
  '--unlock=<unlock>',
  '--password=<password>',
  '--allow-insecure-unlock'
]
[ '<httpport>:<httpport>', '<port>:<port>' ]
[ '<datadir>:<datadir>' ]

pairs is an object to specify how to do the replacement. example:
{
  '<datadir>': '/path/to/datadir',
  '<nodekey>': '/path/to/nodekey/file',
}

example return:
[ '<datadir>:<datadir>' ] => ['/path/to/datadir:/path/to/datadir']

should return a new array of strings that applies the replacements
*/
export function replaceStringArray(arr, pairs) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let str = arr[i];
    for (const [key, value] of Object.entries(pairs)) {
      str = str.replaceAll(key, value);
    }
    newArr.push(str);
  }
  return newArr;
}
