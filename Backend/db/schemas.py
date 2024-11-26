from pydantic import BaseModel, EmailStr
from typing import List

class AdminSignup(BaseModel):
    username: str
    email: EmailStr
    password: str

class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class UserCreate(BaseModel):
    admin_email: EmailStr
    user_email: EmailStr
    username: str
    user_password: str
    role: str
    permissions: List[str]


class UserUpdate(BaseModel):
    admin_email: EmailStr
    user_email: EmailStr
    update_info: dict

class AdminEmail(BaseModel):
    email: EmailStr


class DeleteUserRequest(BaseModel):
    admin_email: str
    user_email: str
