
# sample_data.py
# Temporary sample data (delete when database is connected)

# 1. SUBJECTS
SUBJECTS = [
    {
        "id": 12,
        "name": "Data Structures",
        "code": "PCC-201-COM",
        "branch": "Computer Engineering",
        "year": 2,
        "semester": 3
    },
    {
        "id": 13,
        "name": "Database Management Systems",
        "code": "PCC-202-COM",
        "branch": "Computer Engineering",
        "year": 2,
        "semester": 3
    },
    {
        "id": 14,
        "name": "Object Oriented Programming",
        "code": "PCC-203-COM",
        "branch": "Computer Engineering",
        "year": 2,
        "semester": 4
    },
    {
        "id": 15,
        "name": "Computer Networks",
        "code": "PCC-204-COM",
        "branch": "Computer Engineering",
        "year": 2,
        "semester": 4
    }
]


# 2. RESOURCE_TYPES
RESOURCE_TYPES = [
    {
        "id": 1,
        "name": "Notes",
        "display_order": 1
    },
    {
        "id": 2,
        "name": "Previous Year Question Papers",
        "display_order": 2
    },
    {
        "id": 3,
        "name": "Video Lectures",
        "display_order": 3
    },
    {
        "id": 4,
        "name": "Reference Books",
        "display_order": 4
    }
]


# 3. RESOURCES
RESOURCES = [
    {
        "id": 101,
        "subject_id": 12,
        "type_id": 1,
        "title": "Data Structures Unit 1 Notes",
        "url": "https://example.com/ds-unit-1-notes.pdf",
        "link_kind": "pdf",
        "unit_number": 1,
        "unit_title": "Introduction to Data Structures",
        "published": True
    },
    {
        "id": 102,
        "subject_id": 12,
        "type_id": 1,
        "title": "Data Structures Unit 2 Notes",
        "url": "YOUR_REAL_NOTE_URL_HERE",
        "link_kind": "pdf",
        "unit_number": 2,
        "unit_title": "Stack and Queue",
        "published": True
    },
    {
        "id": 103,
        "subject_id": 12,
        "type_id": 2,
        "title": "Data Structures Previous Year Paper",
        "url": "https://example.com/ds-question-paper.pdf",
        "link_kind": "pdf",
        "unit_number": None,
        "unit_title": None,
        "published": True
    },
    {
        "id": 104,
        "subject_id": 12,
        "type_id": 3,
        "title": "Data Structures Video Lectures",
        "url": "https://www.youtube.com/",
        "link_kind": "external",
        "unit_number": 3,
        "unit_title": "Linked Lists",
        "published": False
    }
]
