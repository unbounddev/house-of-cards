import { ArraySchema, MapSchema, Schema, type } from "@colyseus/schema";

class Card extends Schema {
  @type("string") suit: string;
  @type("string") rank: string;
}

class Player extends Schema {
  @type("string") id: string;
  @type("string") name: string;
  @type([ Card ]) hand = new ArraySchema<Card>();
}

export class SpadesState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  @type([ Card ]) table = new ArraySchema<Card>();
}
