from database import db

def get_users_collection():
    return db.get_database()["users"]

def get_roles_collection():
    return db.get_database()["roles"]
