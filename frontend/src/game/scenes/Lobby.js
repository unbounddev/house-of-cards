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
            fontSize: 48, align: "center"
        }).setOrigin(0.5, 0.5);
        /** @type {Phaser.GameObjects.Container} */
        const startBtnCtn = this.add.container(this.scale.width-175, this.scale.height-75);
        const startBtn = this.add.rectangle(0, 0, 300, 100, 0xffffff, 0).setOrigin(0.5, 0.5);
        startBtn.setStrokeStyle(8, 0xffffff, 1);
        startBtn.setInteractive();
        startBtnCtn.add(startBtn);
        const startBtnText = this.add.text(0, 0, "Start", {
            fontSize: 48
        }).setOrigin(0.5, 0.5);
        startBtnCtn.add(startBtnText);
        startBtnCtn.setVisible(false);

        startBtn.on('pointerover', () => {
                startBtn.setFillStyle(0xffffff, 1);
                startBtnText.setColor(this.game.config.backgroundColor.rgba);
                document.body.style.cursor = "pointer";
            });
        startBtn.on('pointerout', () => {
            startBtn.setFillStyle(0xffffff, 0);
            startBtnText.setColor("#fff");
            document.body.style.cursor = "default";
        });
        startBtn.on('pointerdown', () => {
            startBtn.setFillStyle(0xffffff, 1);
            startBtnText.setColor(this.game.config.backgroundColor.rgba);
            setTimeout(() => {
                // TODO: Send message to backend to start game
                // TODO: Only show startBtn to first player
                this.scene.start(SCENES[game.name]);
            }, 200);
        })

        room.onStateChange((state) => {
            playerText.text = `${state.players.size} Players${state.players.size < game.minPlayers ? '\n\nWaiting on more players to join...' : ''}`;
            startBtnCtn.setVisible(state.players.size >= game.minPlayers)
        })
    }
}