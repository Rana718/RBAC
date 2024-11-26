from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import users, roles

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(roles.router, prefix="/roles", tags=["roles"])

@app.get("/")
async def root():
    return {"message": "Welcome to the User and Role Management API"}
