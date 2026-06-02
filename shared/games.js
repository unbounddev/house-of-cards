export const GAME_NAMES = {
    SPADES: "spades"
}

/** 
 * @typedef { typeof GAME_NAMES} GameName 
 */

/** 
 * @typedef {{
 *  name: string,
 *  displayName: string,
 *  minPlayers: number,
 *  maxPlayers: number
 * }} GameConfig 
 */

/** @type {Record<string, GameConfig>} */
export const GAMES = {
    [GAME_NAMES.SPADES]: {
        name: GAME_NAMES.SPADES,
        displayName: "Spades",
        minPlayers: 2,
        maxPlayers: 4
    },
}