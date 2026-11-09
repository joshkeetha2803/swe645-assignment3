from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session, select
from fastapi.middleware.cors import CORSMiddleware
from database import engine, create_db_and_tables
from models import Survey

app = FastAPI()

# Allow React frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# 1. CREATE a new survey
@app.post("/surveys/", response_model=Survey)
def create_survey(survey: Survey):
    with Session(engine) as session:
        session.add(survey)
        session.commit()
        session.refresh(survey)
        return survey

# 2. READ all surveys
@app.get("/surveys/", response_model=list[Survey])
def read_surveys():
    with Session(engine) as session:
        surveys = session.exec(select(Survey)).all()
        return surveys

# 3. UPDATE a survey
@app.put("/surveys/{survey_id}", response_model=Survey)
def update_survey(survey_id: int, survey_data: Survey):
    with Session(engine) as session:
        survey = session.get(Survey, survey_id)
        if not survey:
            raise HTTPException(status_code=404, detail="Survey not found")
        
        survey_data_dict = survey_data.dict(exclude_unset=True)
        for key, value in survey_data_dict.items():
            setattr(survey, key, value)
            
        session.add(survey)
        session.commit()
        session.refresh(survey)
        return survey

# 4. DELETE a survey
@app.delete("/surveys/{survey_id}")
def delete_survey(survey_id: int):
    with Session(engine) as session:
        survey = session.get(Survey, survey_id)
        if not survey:
            raise HTTPException(status_code=404, detail="Survey not found")
        session.delete(survey)
        session.commit()
        return {"message": "Survey deleted"}