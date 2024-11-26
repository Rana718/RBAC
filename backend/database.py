from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from typing import Optional

load_dotenv()

MONGO_URI = os.getenv("DB_URL")

class Database:
    client: Optional[AsyncIOMotorClient] = None
    
    def get_database(self):
        if not self.client:
            self.client = AsyncIOMotorClient(MONGO_URI)
        return self.client["user_role_management"]

db = Database()
