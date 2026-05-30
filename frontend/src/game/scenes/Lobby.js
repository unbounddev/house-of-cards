import { Scene } from "phaser";
import { SCENES } from "../scenes";
import { REGISTRY } from "../consts";
import { Room } from "@colyseus/sdk";

export class Lobby extends Scene {
    constructor(){
        super(SCENES.LOBBY)
    }
    
    create(){
        /** @type {Room} */
        const room = this.registry.get(REGISTRY.ROOM);
        const roomIdText = this.add.text(this.scale.width-25, 25, `JOIN CODE: ${room.roomId}`, {
            fontSize: 48
        }).setOrigin(1, 0);
        const playerText = this.add.text(this.scale.width/2, this.scale.height/2, `0 Players`, {
            fontSize: 48
        }).setOrigin(0.5, 0.5);

        room.onStateChange((state) => {
            console.log(state.players.size)
            playerText.text = `${state.players.size} Players`;
        })
    }
}