# Snapchain

## Pre-requisites
0. create the password.txt file

- `echo 123456 > /Users/<your username>/.ethereum/snapchain/password.txt`

1. create an account on your host

- `docker run --platform linux/amd64 -d --rm -v /Users/<your username>:/Users/<your username> ethereum/client-go:alltools-latest geth account new --datadir /Users/<your username>/.ethereum/snapchain --password /Users/<your username>/.ethereum/snapchain/password.txt`
- then you can find the account address at `~/.ethereum/snapchain/keystore`

2. create `.env` following `.env.example`
- replace `SEALER_ADDRESS_1` with your account address
- fix `KEYSTORE_DIR` and PASSWORD_FILE


## How to test
1. run `npm run server1` to start node1 and its rpc server
2. get node1's multi addresses '/ip4/127.0.0.1/tcp/8000/ws/p2p/...'
3. in a separate terminal, run `npm run server2 '/ip4/127.0.0.1/tcp/8000/ws/p2p/...'` to start node2
4. in a separate terminal, run `npm run client1` to send a rpc call to node1
5. node1 will then print the payload and forward the message to node2
6. once node2 receives it, it will print the message as well
7. you can run the `client1` command multiple times and see multiple messages printing out in both servers' screens