import { Injectable, NestMiddleware } from "@nestjs/common";
import { Socket } from "socket.io";

@Injectable()
export class WebSocketLoggerMiddleware {
  use(socket: Socket, next: (err?: any) => void) {
    // Log connection
    console.log(`[WebSocket] Connection established - Client ID: ${socket.id}`);

    // Log incoming events
    // @ts-ignore
    const onevent = socket.onevent;
    // @ts-ignore
    socket.onevent = function (packet: any) {
      const args = packet.data || [];
      console.log(`[WebSocket] Event received - Client ID: ${socket.id}`, {
        event: args[0],
        data: args.slice(1),
      });
      onevent.call(this, packet);
    };

    // Log disconnection
    socket.on("disconnect", () => {
      console.log(`[WebSocket] Client disconnected - Client ID: ${socket.id}`);
    });

    next();
  }
}
