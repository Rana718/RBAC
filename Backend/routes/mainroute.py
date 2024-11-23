from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import Admin, User
from db.schemas import AdminSignup, AdminLogin, UserCreate, UserUpdate, AdminEmail
from utils.auth import hash_password, verify_password, create_jwt_token, get_current_admin


router = APIRouter()


@router.get('/')
def hello():
    return {"message": "Hello World"}

@router.post("/signup")
def admin_signup(admin: AdminSignup, db: Session = Depends(get_db)):
    existing_admin = db.query(Admin).filter(Admin.email == admin.email).first()
    if existing_admin:
        raise HTTPException(status_code=400, detail="Admin already exists")
    hashed_password = hash_password(admin.password)
    new_admin = Admin(username=admin.username, email=admin.email, password=hashed_password)
    db.add(new_admin)
    db.commit()
    return {"message": "Admin created successfully"}


@router.post("/login")
def admin_login(admin: AdminLogin, db: Session = Depends(get_db)):
    db_admin = db.query(Admin).filter(Admin.email == admin.email).first()
    if not db_admin or not verify_password(admin.password, db_admin.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_jwt_token(data={"sub": db_admin.email})
    return {"access_token": token, "token_type": "bearer"}


@router.post("/user")
def add_user(user: UserCreate, db: Session = Depends(get_db), current_admin: Admin = Depends(get_current_admin)):
    db_admin = db.query(Admin).filter(Admin.email == user.admin_email).first()
    if not db_admin or db_admin.id != current_admin.id:
        raise HTTPException(status_code=403, detail="You cannot add users for this admin")
    new_user = User(
        username=user.username,
        email=user.user_email,
        password=hash_password(user.user_password),
        role=user.role,
        permissions=",".join(user.permissions),
        admin_id=db_admin.id
    )
    db.add(new_user)
    db.commit()
    return {"message": "User added successfully"}


@router.delete("/user")
def delete_user(user: UserUpdate, db: Session = Depends(get_db), current_admin: Admin = Depends(get_current_admin)):
    db_user = db.query(User).filter(User.email == user.user_email).first()
    if not db_user or db_user.admin_id != current_admin.id:
        raise HTTPException(status_code=403, detail="You cannot delete this user")
    db.delete(db_user)
    db.commit()
    return {"message": "User deleted successfully"}


@router.post("/getusers")
def get_users(admin_email: AdminEmail, db: Session = Depends(get_db), current_admin: Admin = Depends(get_current_admin)):
    db_admin = db.query(Admin).filter(Admin.email == admin_email.email).first()
    if not db_admin or db_admin.id != current_admin.id:
        raise HTTPException(status_code=403, detail="You cannot view users for this admin")
    users = db.query(User).filter(User.admin_id == db_admin.id).all()
    return users

