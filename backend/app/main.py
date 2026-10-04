from fastapi import FastAPI

from backend.app.routes import router


app = FastAPI(title="University Research Opportunity Portal")

app.include_router(router)


@app.get("/")
def home():
    return {"message": "Research Opportunity Portal API is running"}