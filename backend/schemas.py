from pydantic import BaseModel

class TicketBase(BaseModel):
    name: str
    date: str
    venue: str
    price: float
    image: str
    description: str

class TicketCreate(TicketBase):
    pass

class TicketResponse(TicketBase):
    id: int

    class Config:
        from_attributes = True