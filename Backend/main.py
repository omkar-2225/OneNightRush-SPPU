from typing import List
from fastapi import FastAPI, HTTPException
from middleware import setup_CORS
from schemas import Subject, Resource, ResourceType
from sampleData import SUBJECTS, RESOURCE_TYPES, RESOURCES

app = FastAPI()
setup_CORS(app)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/subjects", response_model=List[Subject])
def get_subjects(branch: str, year: int, semester: int):
    branch = branch.strip()
    return [
        subject for subject in SUBJECTS
        if subject["branch"] == branch 
        and subject["year"] == year
        and subject["semester"] == semester
    ]


@app.get("/subjects/{subject_id}/types", response_model=List[ResourceType])
def get_resource_types(subject_id: int):

    # Step 1: Check whether subject exists
    if not any(subject["id"] == subject_id for subject in SUBJECTS):
        raise HTTPException(status_code=404, detail="Subject not found")

    # Step 2: Collect type IDs from published resources
    type_ids = {
        resource["type_id"]
        for resource in RESOURCES
        if resource["subject_id"] == subject_id
        and resource["published"] is True
    }

    # Step 3: Filter resource types
    result = [
        resource_type
        for resource_type in RESOURCE_TYPES
        if resource_type["id"] in type_ids
    ]

    # Step 4: Sort by display order
    result.sort(key=lambda x: x["display_order"])

    # Step 5: Return result
    return result


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
    