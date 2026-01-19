import { useState, useEffect } from "react";
import styles from "./jokecomponent.module.scss";

type Joke = {
  setup: string;
  punchline: string;
};

const categories = ["programming", "general", "knock-knock"];

export function Jokecomponent() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(categories[0]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const fetchJoke = async (category: string) => {
    setLoading(true);
    const res = await fetch(`https://official-joke-api.appspot.com/jokes/${category}/random`);
    const data = await res.json();
    setJoke(data[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetchJoke(category);
  }, [category]);

  // skift tema med dark og light mode
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`${styles.jokeContainer} ${theme === "dark" ? styles.dark : styles.light}`}>
      <h1 className={styles.title}>Joke App Simon</h1>
      <button className={styles.themeButton} onClick={toggleTheme}>
        Skift til {theme === "light" ? "dark" : "light"} Mode
      </button>
      <div className={styles.categorySelector}>
        <label htmlFor="category">Valg af kategori:</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {loading && <p>Loading...</p>}
      {joke && (
        <div className={styles.jokeBox}>
          <p className={styles.setup}>{joke.setup}</p>
          <p className={styles.punchline}>{joke.punchline}</p>
        </div>
      )}
      <button className={styles.button} onClick={() => fetchJoke(category)} disabled={loading}>
        Henter en ny joke
      </button>
    </div>
  );
}
