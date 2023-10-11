from fastapi import APIRouter

from api.models import ErrorModel, ResponseModel
from db import queries
from db.documents import Movie

api_router = APIRouter(prefix="/api")


@api_router.get(
    "/movies/{movie_id}",
    response_model=ResponseModel,
    response_description="Get information about a specific movie"
)
async def get_movie_by_id(movie_id: str):
    """
    Endpoint to get information about a specific movie
    :param movie_id: movie id you want to query, e.g. tt0064116
    """
    if (movie := await queries.get_movie_by_id(movie_id)) is None:
        error = ErrorModel(title=movie_id, message="No movie found")
        return {"status_code": 404, "body": error}

    return {"status_code": 200, "body": movie}


@api_router.get(
    "/movies",
    response_model=ResponseModel,
    response_description="Get information about all movies"
)
async def get_movies(search: str | None = None):
    if search is not None:
        movies = await queries.search_movies(search)
    else:
        movies = await queries.get_movies()

    if not movies:
        error = ErrorModel(title=f"Nothing found for: {search}", message="No movie found")
        return {"status_code": 404, "body": error}

    return {"status_code": 200, "body": movies}


@api_router.post(
    "/movies",
    response_model=ResponseModel,
    response_description="Post a new movie to the database"
)
async def post_movie(movie: Movie):
    if (db_movie := await queries.create_movie(movie)) is None:
        error = ErrorModel(title="Oops", message="Something went wrong while inserting a new movie")
        return {"status_code": 500, "body": error}

    return {"status_code": 200, "body": db_movie}
