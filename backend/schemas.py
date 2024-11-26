from pydantic import BaseModel, EmailStr
from typing import List, Optional


class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: str
    status: str 

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    role: Optional[str]
    status: Optional[str]

class UserResponse(UserBase):
    id: int
    
    class Config:
        orm_mode = True

class RoleBase(BaseModel):
    name: str
    description: str
    permissions: List[str]

class RoleCreate(RoleBase):
    pass

class RoleUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    permissions: Optional[List[str]]

class RoleResponse(RoleBase):
    id: int
    
    class Config:
        orm_mode = True
