import { Room, Client, CloseCode, AuthContext } from "colyseus";
import { Player, SpadesState } from "./schema/SpadesState.js";

export class Spades extends Room {
  maxClients = 4;
  state = new SpadesState();

  messages = {
    yourMessageType: (client: Client, message: any) => {
      /**
       * Handle "yourMessageType" message.
       */
      console.log(client.sessionId, "sent a message:", message);
    }
  }

  onCreate (options: any) {
    /**
     * Called when a new room is created.
     */
  }

  onAuth(client: Client, options: any, context: AuthContext) {
    return !this.state.started;
  }

  onJoin (client: Client, options: any) {
    /**
     * Called when a client joins the room.
     */
    // console.log(client.sessionId, "joined!");
    this.state.players.set(client.sessionId, new Player(client.sessionId, "Player"));
  }

  onLeave (client: Client, code: CloseCode) {
    /**
     * Called when a client leaves the room.
     */
    console.log(client.sessionId, "left!", code);
    this.state.players.delete(client.sessionId);
    if (this.state.started){
      this.disconnect();
    }
  }

  onDispose() {
    /**
     * Called when the room is disposed.
     */
    console.log("room", this.roomId, "disposing...");
  }

}
