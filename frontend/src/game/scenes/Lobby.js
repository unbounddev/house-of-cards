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
        /** @type {import("../../../../shared/games").GameConfig} */
        const game = this.registry.get(REGISTRY.GAME);
        const roomIdText = this.add.text(this.scale.width-25, 25, `JOIN CODE: ${room.roomId}`, {
            fontSize: 48
        }).setOrigin(1, 0);
        const gameText = this.add.text(25, 25, `GAME: ${game.displayName}`, {
            fontSize: 48
        }).setOrigin(0, 0);
        const playerText = this.add.text(this.scale.width/2, this.scale.height/2, `${room.state.players ? room.state.players.size : '0'} Players`, {
            fontSize: 48
        }).setOrigin(0.5, 0.5);

        room.onStateChange((state) => {
            playerText.text = `${state.players.size} Players`;
        })
    }
}