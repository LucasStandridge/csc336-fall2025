import {useState, useEffect} from "react";

export default function App() {
  const [deck, setDeck] = useState({
    Monsters: [],
    Spells: [],
    Traps: [],
  });

  async function getYGODeck() {
    try {
      const response = await fetch(
        "https://db.ygoprodeck.com/api/v7/cardinfo.php"
      );
      const data = (await response.json()).data;

      const random40 = [];
      for (let i = 0; i < 40; i++) {
        const card = data[Math.floor(Math.random() * data.length)];
        random40.push(card);
      }

      const finalDeck = {
        Monsters: [],
        Spells: [],
        Traps: [],
      };

      for (let card of random40) {
        if (card.type.includes("Monster")) finalDeck.Monsters.push(card.name);
        else if (card.type.includes("Spell")) finalDeck.Spells.push(card.name);
        else if (card.type.includes("Trap")) finalDeck.Traps.push(card.name);
      }

      setDeck(finalDeck);
    } catch (err) {
      console.log("Whoops:", err);
    }
  }

  useEffect(() => {
    getYGODeck();
  }, []);

return (
    <div>
      <button onClick={getYGODeck}>Make a deck!</button>
        <div>
          <h1>Your Deck!</h1>
          <h2>Monsters</h2>
          <ol>
            {deck.Monsters.map((name, i) => (
              <li key={i}>{name}</li>
            ))}

          <h2>Spells</h2>
            {deck.Spells.map((name, i) => (
              <li key={i}>{name}</li>
            ))}

          <h2>Traps</h2>
            {deck.Traps.map((name, i) => (
              <li key={i}>{name}</li>
            ))}
          </ol>
        </div>
    </div>
  );
}