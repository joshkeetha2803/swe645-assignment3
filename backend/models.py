from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import date

class Survey(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    street_address: str
    city: str
    state: str
    zip_code: str
    telephone: str
    email: str
    survey_date: date
    liked_most: str
    interest_source: str
    recommendation: str