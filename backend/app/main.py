from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.routes import router


app = FastAPI(title="University Research Opportunity Portal")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5500",
        "http://127.0.0.1:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)


@app.get("/")
def home():
    return {"message": "Research Opportunity Portal API is running"}