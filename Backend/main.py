from fastapi import FastAPI
from db.database import Base, engine
from routes import mainroute as admin_routes


Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(admin_routes.router, prefix="/admin", tags=["Admin"])