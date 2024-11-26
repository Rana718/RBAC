from fastapi import APIRouter, HTTPException
from models import users_collection
from schemas import UserCreate, UserUpdate, UserResponse
from bson import ObjectId
from typing import List

router = APIRouter()


@router.get("/", response_model=List[UserResponse])
async def get_users():
    users = await users_collection.find().to_list(100)
    return [{"_id": str(user["_id"]), **user} for user in users]


@router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate):
    result = await users_collection.insert_one(user.dict())
    created_user = await users_collection.find_one({"_id": result.inserted_id})
    return {"_id": str(created_user["_id"]), **created_user}


@router.put("/{id}", response_model=UserResponse)
async def update_user(id: str, user: UserUpdate):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID")
    
    update_result = await users_collection.update_one({"_id": ObjectId(id)}, {"$set": user.dict(exclude_unset=True)})
    if update_result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    updated_user = await users_collection.find_one({"_id": ObjectId(id)})
    return {"_id": str(updated_user["_id"]), **updated_user}



@router.delete("/{id}")
async def delete_user(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID")
    
    delete_result = await users_collection.delete_one({"_id": ObjectId(id)})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": "User deleted successfully"}
