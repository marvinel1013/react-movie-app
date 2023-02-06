import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/card/Card";
import SetPagination from "../components/pagination/SetPagination";

function Movies() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_SOME_KEY
      }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
    );
    console.log(data);
    setContent(data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  if (loading)
    return (
      <h1 className="mt-10 text-lg font-medium text-center text-gray-800 dark:text-slate-200">
        Loading...
      </h1>
    );

  return (
    <div className="w-full min-h-screen lg:px-20">
      <h1 className="flex items-center justify-center text-2xl font-black mb-5 text-red-700">
        Movies
      </h1>
      <div className="w-full px-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {content.map((c) => (
          <div key={c.id} className="flex justify-center">
            <Card data={c} media_type="movie" />
          </div>
        ))}
      </div>
      <div className="mt-7 flex items-center justify-center">
        <SetPagination page={page} setPage={setPage} numOfPages={120} />
      </div>
    </div>
  );
}

export default Movies;
