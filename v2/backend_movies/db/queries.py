from beanie.odm.operators.find.evaluation import RegEx

from db.documents import Movie


async def get_movie_by_id(movie_id) -> Movie | None:
    """
    Retrieve a single movie from the database, returns None if no movie
    was found
    """
    return await Movie.find_one(Movie.imdb == movie_id)


async def get_movies(limit: int = 100) -> list[Movie]:
    """
    Retrieve all movies from the database, limited by the limit parameter
    """
    return await Movie.find().limit(limit).to_list()


async def search_movies(query: str) -> list[Movie]:
    """
    Retrieve all movies that match the search query
    """
    pattern = f"{query}*"

    results = Movie.find(RegEx(Movie.title, pattern, options="i"))
    return await results.to_list()


async def create_movie(movie: Movie) -> Movie:
    """
    Insert a record into the database, returns the inserted movie
    """
    return await movie.insert()
