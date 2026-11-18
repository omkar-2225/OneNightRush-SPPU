from pydantic import BaseModel
from typing import Optional

class Subject(BaseModel):
    id: int
    name: str
    code: str
    
class Resource(BaseModel):
    id: int 
    title: str
    url: str
    link_kind: str
    unit_number: Optional[int] = None
    unit_title: Optional[str] = None

class ResourceType(BaseModel):
    id: int
    name: str