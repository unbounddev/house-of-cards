import { Scene } from 'phaser';
import { SCENES } from '../scenes';

export class Boot extends Scene
{
    constructor ()
    {
        super(SCENES.BOOT);
    }

    preload ()
    {
    }

    create ()
    {
        this.scene.start(SCENES.PRELOADER);
    }
}
