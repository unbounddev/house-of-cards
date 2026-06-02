import {
    defineServer,
    defineRoom,
    monitor,
    playground,
    createRouter,
    createEndpoint,
} from "colyseus";

/**
 * Import your Room files
 */
import { Spades } from "./rooms/Spades/Spades.js";
import { GAME_NAMES, GAMES } from "../../shared/games.js";

const server = defineServer({
    /**
     * Define your room handlers:
     */
    rooms: {
        [GAMES[GAME_NAMES.SPADES].name]: defineRoom(Spades)
    },

    /**
     * Bind your custom express routes here:
     * Read more: https://expressjs.com/en/starter/basic-routing.html
     */
    express: (app) => {
        /**
         * Use @colyseus/monitor
         * It is recommended to protect this route with a password
         * Read more: https://docs.colyseus.io/tools/monitoring/#restrict-access-to-the-panel-using-a-password
         */
        app.use("/monitor", monitor());

        /**
         * Use @colyseus/playground
         * (It is not recommended to expose this route in a production environment)
         */
        if (process.env.NODE_ENV !== "production") {
            app.use("/", playground());
        }
    }

});

export default server;