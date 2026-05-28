import { Scene } from "phaser";
import { SCENES } from "../scenes";
import { Client } from "@colyseus/sdk";

export class CreateOrJoin extends Scene {
    constructor(){
        super(SCENES.CREATE_OR_JOIN);
    }

    create() {
        /** @type {Client} */
        const client = this.registry.get("client");
        const game = this.registry.get("game");
        const createBtn = this.add.rectangle(this.scale.width/2, this.scale.height/2-100, Math.min(this.scale.width*0.8, 750), 150, 0xffffff, 0);
        createBtn.setStrokeStyle(16, 0xffffff, 1);
        const createText = this.add.text(this.scale.width/2, this.scale.height/2-100, ("Create").toUpperCase(), {
            fontSize: 64, color: "#fff", fontFamily: "Helvetica", fontStyle: "bold"
        }).setOrigin(0.5, 0.5);
        createBtn.setInteractive();
        const joinBtn = this.add.rectangle(this.scale.width/2, this.scale.height/2+100, Math.min(this.scale.width*0.8, 750), 150, 0xffffff, 0);
        joinBtn.setStrokeStyle(16, 0xffffff, 1);
        joinBtn.setInteractive();
        const joinText = this.add.text(this.scale.width/2, this.scale.height/2+100, ("Join").toUpperCase(), {
            fontSize: 64, color: "#fff", fontFamily: "Helvetica", fontStyle: "bold"
        }).setOrigin(0.5, 0.5);

        createBtn.on('pointerover', () => {
            createBtn.setFillStyle(0xffffff, 1);
            createText.setColor(this.game.config.backgroundColor.rgba);
            document.body.style.cursor = "pointer";
        });
        createBtn.on('pointerout', () => {
            createBtn.setFillStyle(0xffffff, 0);
            createText.setColor("#fff");
            document.body.style.cursor = "default";
        });

        joinBtn.on('pointerover', () => {
            joinBtn.setFillStyle(0xffffff, 1);
            joinText.setColor(this.game.config.backgroundColor.rgba);
            document.body.style.cursor = "pointer";
        });
        joinBtn.on('pointerout', () => {
            joinBtn.setFillStyle(0xffffff, 0);
            joinText.setColor("#fff");
            document.body.style.cursor = "default";
        });

        createBtn.on('pointerdown', async () => {
            try {
                const room = await client.joinOrCreate(game);
                this.registry.set('room', room);
                this.scene.start(SCENES.GAME);
            } catch (e){
                // TODO: show error message
            }
        })
    }
}