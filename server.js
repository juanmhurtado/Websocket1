const WebSocket = require('ws');
const port = 8080; // Puerto deseado
const lora32Host = '192.168.1.116'; // Dirección IP de la Lora32
const lora32Port = 8080; // Puerto del servidor WebSocket en la Lora32

function startServer() {
  const wss = new WebSocket.Server({ port });

  wss.on('listening', () => {
    console.log(`Servidor WebSocket escuchando en el puerto ${port}`);
    
    // Llamada a la función para enviar un mensaje una vez que el servidor está escuchando
    enviarMensajeWebSocket();
  });

  wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    
    ws.on('message', (message) => {
      console.log(`Mensaje recibido: ${message}`);
      // Puedes responder al cliente aquí si es necesario
    });

    ws.on('close', () => {
      console.log('Cliente desconectado');
    });
  });

  wss.on('error', (err) => {
    console.error(`Error al iniciar el servidor en el puerto ${port}: ${err.message}`);
    setTimeout(startServer, 1000); // Intenta nuevamente después de 1 segundo
  });
}

// Función para enviar un mensaje a través de WebSocket a la Lora32
function enviarMensajeWebSocket() {
  const message = "Hola, Lora32!";
  
  const ws = new WebSocket(`ws://${lora32Host}:${lora32Port}`);

  ws.onopen = () => {
    // Enviar el mensaje cuando la conexión está abierta
    ws.send(message);
  };

  ws.onmessage = (event) => {
    // Manejar la respuesta de la Lora32
    const response = event.data;
    console.log(`Respuesta de la Lora32: ${response}`);
    ws.close(); // Cierra la conexión WebSocket
  };

  ws.onerror = (error) => {
    console.error(`Error al enviar el mensaje a la Lora32: ${error.message}`);
  };
}

// Llamar a la función para iniciar el servidor WebSocket
startServer();

 
























