export default function socketComments (io) {

  const onConnectionEvent = (socket) => {
    console.log("conectado");
  }

  io.on("connection", onConnectionEvent)
}