import { Scene } from 'phaser';
import { SCENES } from '../scenes';

export class MainMenu extends Scene
{
    constructor ()
    {
        super(SCENES.MAIN_MENU);
    }

    create ()
    {
        this.input.once('pointerdown', () => {
            this.scene.start(SCENES.GAME);
        });
    }
}
