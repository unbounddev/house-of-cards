import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { AUTO, Game, Scale } from 'phaser';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const getGameDimensions = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    if (width >= height){
        width = 1920;
        height = 1080;
    } else {
        width = 390*3;
        height = 844*3;
    }

    return { width, height };
}


const config = {
    type: AUTO,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver
    ]
};

const StartGame = (parent) => {
    const dimensions = getGameDimensions();
    return new Game({ ...config, ...dimensions, parent });
}

export default StartGame;
