import pymongo
from beanie import Document


class Movie(Document):
    title: str
    year: int
    imdb: str
    type: str
    image: str
    description: str

    class Settings:
        name = 'movies'
        indexes = [
            [
                ("title", pymongo.TEXT),
                ("imdb", pymongo.TEXT)
            ]
        ]

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Karate kid",
                "year": 1984,
                "imdb": "tt0087538",
                "type": "Action",
                "image": "https://m.media-amazon.com/images/M/MV5BMjhkMjU2YWMtNzMzYi00Zjk0LTlmNWUtMmJlYWFkNjkzZDQxXkEyXkFqcGdeQXVyNTUyMzE4Mzg@._V1_FMjpg_UX990_.jpg",
                "description": "A martial arts master agrees to teach karate to a bullied teenager."
            }
        }
