import { GAME_NAMES } from "../../../shared/games";

export const SCENES = {
    BOOT: "boot",
    PRELOADER: "preloader",
    MAIN_MENU: "main-menu",
    CREATE_OR_JOIN: "create-or-join",
    GAME_SELECTION: "game-selection",
    LOBBY: "lobby",
    GAME: "game",
    GAME_OVER: "game-over",

    ...GAME_NAMES
}