import { Scene } from 'phaser';
import { SCENES } from '../scenes';
import { games } from '../../../../shared/games';
import { REGISTRY } from '../consts';

export class GameSelection extends Scene
{
    constructor ()
    {
        super(SCENES.GAME_SELECTION);
    }

    create ()
    {
        /** @type {Record<"true"|"false", number[]>} */
        const gameOptionHeights = {
            true: [this.scale.height/4, (this.scale.height/4)+200, (this.scale.height/4)+400],
            false: [this.scale.height/3, (this.scale.height/3)+200, (this.scale.height/3)+400]
        }
        /** @type {boolean} */
        const isMobile = this.registry.get(REGISTRY.IS_MOBILE);
        /** @type {Client} */
        const client = this.registry.get(REGISTRY.CLIENT);

        this.add.text(this.scale.width/2, this.scale.height/6, ("Select Game").toUpperCase(), {
            fontSize: 64, fontFamily: "Arial", fontStyle: "bold"
        }).setOrigin(0.5, 0.5);
        // TODO: Handle multiple pages of games
        for(let i = 0; i < gameOptionHeights[String(isMobile)].length; i++){
            if (i > games.length-1){ break; }
            const game = games[i];
            const gameBtn = this.add.rectangle(this.scale.width/2, gameOptionHeights[String(isMobile)][i], Math.min(this.scale.width*0.8, 750), 150, 0xffffff, 0);
            gameBtn.setStrokeStyle(16, 0xffffff, 1);
            gameBtn.setInteractive();
            gameBtn.setData('game', game);
            const gameBtnText = this.add.text(this.scale.width/2, gameOptionHeights[String(isMobile)][i], game.displayName.toUpperCase(), {
                fontSize: 64, color: "#fff", fontFamily: "Helvetica", fontStyle: "bold"
            }).setOrigin(0.5, 0.5);
            gameBtn.on('pointerover', () => {
                gameBtn.setFillStyle(0xffffff, 1);
                gameBtnText.setColor(this.game.config.backgroundColor.rgba);
                document.body.style.cursor = "pointer";
            });
            gameBtn.on('pointerout', () => {
                gameBtn.setFillStyle(0xffffff, 0);
                gameBtnText.setColor("#fff");
                document.body.style.cursor = "default";
            });
            gameBtn.on('pointerdown', () => {
                gameBtn.setFillStyle(0xffffff, 1);
                gameBtnText.setColor(this.game.config.backgroundColor.rgba);
                setTimeout(async () => {
                    try {
                        const game = gameBtn.getData('game')
                        this.registry.set(REGISTRY.GAME, game);
                        const room = await client.create(game.name);
                        this.registry.set(REGISTRY.ROOM, room);
                        this.scene.start(SCENES.LOBBY);
                    } catch (e) {
                        // TODO: Handle Error
                    }
                    
                }, 200);
            })
        }
    }
}
