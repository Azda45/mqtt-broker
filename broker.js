// broker.js

const aedes = require('aedes')();
const net = require('net');
const port = 80; // Port default untuk MQTT

// Menangani koneksi
aedes.on('client', (client) => {
  console.log(`Client Connected: ${client.id}`);
});

aedes.on('clientDisconnect', (client) => {
  console.log(`Client Disconnected: ${client.id}`);
});

// Menangani pesan yang diterima
aedes.on('publish', (packet, client) => {
  // packet.payload adalah isi pesan
  const message = packet.payload.toString();
  const topic = packet.topic;

  console.log(`Received message on topic '${topic}': ${message}`);
});

// Membuat server MQTT
const server = net.createServer(aedes.handle);
server.listen(port, () => {
  console.log(`MQTT broker started on port ${port}`);
});
