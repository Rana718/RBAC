from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional

# Schema for admin signup
class AdminSignup(BaseModel):
    username: str
    email: EmailStr
    password: str

# Schema for admin login
class AdminLogin(BaseModel):
    email: EmailStr
    password: str

# Schema for user creation under an admin
class UserCreate(BaseModel):
    admin_email: EmailStr
    user_email: EmailStr
    username: str
    user_password: str
    role: str
    permissions: List[str]

# Schema for updating user info
class UserUpdate(BaseModel):
    admin_email: EmailStr
    user_email: EmailStr
    update_info: dict

# Schema for retrieving users under an admin
class AdminEmail(BaseModel):
    email: EmailStr
