from fastapi import APIRouter, HTTPException
from models import roles_collection
from schemas import RoleCreate, RoleUpdate, RoleResponse
from bson import ObjectId
from typing import List

router = APIRouter()

# Add this function to initialize default roles
async def initialize_default_roles():
    default_roles = [
        {
            "name": "USER",
            "description": "Regular user with basic access",
            "permissions": ["read"]
        },
        {
            "name": "ADMIN",
            "description": "Administrator with full access",
            "permissions": ["read", "write", "delete", "manage"]
        },
        {
            "name": "EMPLOY",
            "description": "Employee with standard permissions",
            "permissions": ["read", "write"]
        }
    ]
    

    existing_roles = await roles_collection.find().to_list(100)
    if not existing_roles:
        await roles_collection.insert_many(default_roles)

@router.get("/", response_model=List[RoleResponse])
async def get_roles():

    await initialize_default_roles()
    
    # Fetch all roles
    roles = await roles_collection.find().to_list(100)
    return [{"_id": str(role["_id"]), **role} for role in roles]


@router.post("/", response_model=RoleResponse)
async def create_role(role: RoleCreate):
    result = await roles_collection.insert_one(role.dict())
    created_role = await roles_collection.find_one({"_id": result.inserted_id})
    return {"_id": str(created_role["_id"]), **created_role}


@router.put("/{id}", response_model=RoleResponse)
async def update_role(id: str, role: RoleUpdate):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID")
    
    update_result = await roles_collection.update_one({"_id": ObjectId(id)}, {"$set": role.dict(exclude_unset=True)})
    if update_result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Role not found")
    
    updated_role = await roles_collection.find_one({"_id": ObjectId(id)})
    return {"_id": str(updated_role["_id"]), **updated_role}

@router.delete("/{id}")
async def delete_role(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID")
    
    delete_result = await roles_collection.delete_one({"_id": ObjectId(id)})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Role not found")
    
    return {"message": "Role deleted successfully"}
