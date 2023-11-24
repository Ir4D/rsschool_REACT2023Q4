import { useEffect, useState } from "react";
import style from "../styles/CardsList.module.css";
import Link from "next/link";

const CardsList = () => {
  const [cardsList, setCardsList] = useState([]);
  // const [loading, setLoading] = useState(true);

  const limit = 12;
  const page = 1;

  useEffect(() => {
    // setLoading(true);
    const fetchData = async  () => {
      const responce = await fetch(`https://api.jikan.moe/v4/anime?limit=${limit}&page=${page}`);
      const data = await responce.json();
      setCardsList(data.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <h2>Cards</h2>
      <div>  
        {cardsList && cardsList.length !== 0 ? (
          <ul className={style.animeList}>
            {cardsList && cardsList.map((anime) => (
              <li key={anime.mal_id}>
                <Link href={`/details/${anime.mal_id}`}>{anime.title}</Link>
              </li>
            ))}
        </ul>
        ) : (
        <p>No anime were found</p>
        )}
      </div>
    </>
  );
};

export default CardsList;
