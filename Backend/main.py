from typing import List
from fastapi import FastAPI, HTTPException, Depends
from middleware import setup_CORS
from schemas import Subject, Resource, ResourceType
from sampleData import SUBJECTS, RESOURCE_TYPES, RESOURCES
from sqlalchemy import text
from db import get_db

app = FastAPI()
setup_CORS(app)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/subjects", response_model=List[Subject])
def get_subjects(branch: str, year: int, semester: int, db = Depends(get_db)):
    branch = branch.strip()
    rows = db.execute(
        text(
            """
            select id, name, code
            from subjects
            where lower(branch) = lower(:branch) and year = :year and semester = :semester
            order by name
            """
        ),
        {"branch": branch, "year": year, "semester": semester},
    ).mappings().all()
    return [dict(row) for row in rows]


@app.get("/subjects/{subject_id}/types", response_model=List[ResourceType])
def get_resource_types(subject_id: int, db = Depends(get_db)):
    
    subject = db.execute(
        text("select 1 from subjects where id = :subject_id"),
        {"subject_id": subject_id},
    ).first()
    if subject is None:
        raise HTTPException(status_code=404, detail="Subject not found")
    
    rows = db.execute(
        text(
            """
            select rt.id, rt.name
            from resource_types rt
            where exists (
            select 1 from resources r
            where r.type_id = rt.id
            and r.subject_id = :subject_id
            and r.published = true
            )
            order by rt.display_order
            """
        ),  {"subject_id": subject_id}
    ).mappings().all()
    return [dict(row) for row in rows]


@app.get("/subjects/{subject_id}/resources",response_model=List[Resource])
def get_resources(subject_id: int, type_id: int):
    
    # subject exits or not 
    if not any(subject["id"] == subject_id for subject in SUBJECTS):
        raise HTTPException(status_code=404, detail="Subject not found.")
    
    # filter resource
    result = [
        resource
        for resource in RESOURCES
        if resource["subject_id"] == subject_id
        and resource["type_id"] == type_id
        and resource["published"] is True
    ]
    
    # sort the resource 
    result.sort(key = lambda x: (x["unit_number"] is None,
                                 x["unit_number"] or 0)
                )
    
    return result
    