import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("publisher connected to nats");

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: "423",
      title: "test",
      price: 20,
      userId: "1",
    });
  } catch (error) {
    console.log("Err", error);
  }
});
