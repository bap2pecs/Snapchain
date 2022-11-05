# Snapchain

## How to test
1. run `node src/scripts/server1.js '/ip4/127.0.0.1/tcp/8000/ws' '0.0.0.0:50051'` to start node1 and its rpc server
2. get node1's multi addresses '/ip4/127.0.0.1/tcp/8000/ws/p2p/...'
3. in a separate terminal, run `node src/scripts/server2.js '/ip4/127.0.0.1/tcp/8001/ws' '/ip4/127.0.0.1/tcp/8000/ws/p2p/...'` to start node2
4. in a separate terminal, run `node src/scripts/client1.js` to send a rpc call to node1
5. node1 will then print the payload and forward the message to node2
6. once node2 receives it, it will print the message as well
7. you can run the `client.js` scripts multiple times and see multiple messages printing out in both servers' screens