from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models
import schemas

router = APIRouter()

async def initialize_default_roles(db: Session):
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
    
    existing_roles = db.query(models.Role).count()
    if not existing_roles:
        for role in default_roles:
            db_role = models.Role(**role)
            db.add(db_role)
        db.commit()

@router.get("/", response_model=List[schemas.RoleResponse])
async def get_roles(db: Session = Depends(get_db)):
    await initialize_default_roles(db)
    roles = db.query(models.Role).all()
    return roles

@router.post("/", response_model=schemas.RoleResponse)
async def create_role(role: schemas.RoleCreate, db: Session = Depends(get_db)):
    db_role = models.Role(**role.dict())
    db.add(db_role)
    db.commit()
    db.refresh(db_role)
    return db_role

@router.put("/{id}", response_model=schemas.RoleResponse)
async def update_role(id: int, role: schemas.RoleUpdate, db: Session = Depends(get_db)):
    db_role = db.query(models.Role).filter(models.Role.id == id).first()
    if not db_role:
        raise HTTPException(status_code=404, detail="Role not found")
    
    for key, value in role.dict(exclude_unset=True).items():
        setattr(db_role, key, value)
    
    db.commit()
    db.refresh(db_role)
    return db_role

@router.delete("/{id}")
async def delete_role(id: int, db: Session = Depends(get_db)):
    db_role = db.query(models.Role).filter(models.Role.id == id).first()
    if not db_role:
        raise HTTPException(status_code=404, detail="Role not found")
    
    db.delete(db_role)
    db.commit()
    return {"message": "Role deleted successfully"}
