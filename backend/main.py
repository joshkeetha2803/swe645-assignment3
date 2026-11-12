from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Field, Session, create_engine, select
from sqlalchemy import text
from typing import Optional, List

app = FastAPI(title="Student Survey API")

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Connect to the MySQL server without specifying a database
SERVER_URL = "mysql+pymysql://admin:xkKjVBi7p6r9PxMvxA1W@database-1.cfhpfm12kfjd.us-east-1.rds.amazonaws.com:3306"
server_engine = create_engine(SERVER_URL, isolation_level="AUTOCOMMIT")

# 2. Create our own dedicated database called survey_db if it doesn't exist
with server_engine.connect() as conn:
    conn.execute(text("CREATE DATABASE IF NOT EXISTS survey_db"))

# 3. Now connect SQLModel to our new survey_db
DATABASE_URL = f"{SERVER_URL}/survey_db"
engine = create_engine(DATABASE_URL, echo=True)

class Survey(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    firstName: str
    lastName: str
    street: str
    city: str
    state: str
    zip: str
    phone: str
    email: str
    date: str
    likedMost: Optional[str] = None
    interestSource: Optional[str] = None
    recommendationLikelihood: Optional[str] = None
    comments: Optional[str] = None

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.post("/api/surveys", response_model=Survey)
def create_survey(survey: Survey):
    with Session(engine) as session:
        session.add(survey)
        session.commit()
        session.refresh(survey)
        return survey

@app.get("/api/surveys", response_model=List[Survey])
def get_surveys():
    with Session(engine) as session:
        surveys = session.exec(select(Survey)).all()
        return surveys

@app.get("/api/surveys/{survey_id}", response_model=Survey)
def get_survey(survey_id: int):
    with Session(engine) as session:
        survey = session.get(Survey, survey_id)
        if not survey:
            raise HTTPException(status_code=404, detail="Survey not found")
        return survey

@app.put("/api/surveys/{survey_id}", response_model=Survey)
def update_survey(survey_id: int, updated_survey: Survey):
    with Session(engine) as session:
        survey = session.get(Survey, survey_id)
        if not survey:
            raise HTTPException(status_code=404, detail="Survey not found")
        survey_data = updated_survey.dict(exclude_unset=True)
        for key, value in survey_data.items():
            setattr(survey, key, value)
        session.add(survey)
        session.commit()
        session.refresh(survey)
        return survey

@app.delete("/api/surveys/{survey_id}")
def delete_survey(survey_id: int):
    with Session(engine) as session:
        survey = session.get(Survey, survey_id)
        if not survey:
            raise HTTPException(status_code=404, detail="Survey not found")
        session.delete(survey)
        session.commit()
        return {"message": "Survey deleted successfully"}