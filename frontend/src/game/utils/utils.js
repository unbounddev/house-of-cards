export function CardTexture(suit, rank){
    const suits = {
        C: "Clubs",
        D: "Diamonds",
        H: "Hearts",
        S: "Spades"
    }

    return `card${suits[suit]}${rank}.png`;
}