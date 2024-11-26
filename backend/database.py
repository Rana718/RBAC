from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("DB_URL")

client = AsyncIOMotorClient(MONGO_URI)
db = client["user_role_management"]
