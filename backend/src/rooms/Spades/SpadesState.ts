import { ArraySchema, MapSchema, Schema, type } from "@colyseus/schema";

class Card extends Schema {
  @type("string") suit: string;
  @type("string") rank: string;
}

export class Player extends Schema {
  @type("string") id: string;
  @type("string") name: string;
  @type([ Card ]) hand = new ArraySchema<Card>();

  constructor(id: string, name: string = "Player"){
    super()
    this.id = id;
    this.name = name;
  }
}

export class SpadesState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  @type([ Card ]) table = new ArraySchema<Card>();
  @type("boolean") started = false;
}
