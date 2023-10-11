import os

from motor.motor_asyncio import AsyncIOMotorClient

from beanie import init_beanie

from db.documents import Movie


async def init_db():
    dsn = os.getenv("MONGO_URL", "mongodb://localhost:27017")

    client = AsyncIOMotorClient(dsn)
    await init_beanie(database=client.video, document_models=[Movie])
