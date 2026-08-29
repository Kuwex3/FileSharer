from sqlmodel import SQLModel, Field

class File(SQLModel, table=True):
    id: int = Field(primary_key=True, nullable=False)
    file_name: str = Field(unique=True, min_length=5, nullable=False)
    size: int = Field(nullable=False)