from datetime import date
from typing import Optional

from pydantic import BaseModel, Field


class OpportunityCreate(BaseModel):
    title: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)
    research_area: str = Field(..., min_length=1)
    faculty_name: str = Field(..., min_length=1)
    department: str = Field(..., min_length=1)
    required_skills: str = Field(..., min_length=1)
    available_positions: int = Field(..., gt=0)
    application_deadline: date
    status: str = "Open"


class OpportunityUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1)
    description: Optional[str] = Field(None, min_length=1)
    research_area: Optional[str] = Field(None, min_length=1)
    faculty_name: Optional[str] = Field(None, min_length=1)
    department: Optional[str] = Field(None, min_length=1)
    required_skills: Optional[str] = Field(None, min_length=1)
    available_positions: Optional[int] = Field(None, gt=0)
    application_deadline: Optional[date] = None
    status: Optional[str] = None