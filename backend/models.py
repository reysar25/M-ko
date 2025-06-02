from sqlalchemy import Column, Integer, String, Float
from backend.database import Base  # Import Base from your database.py

class Ticket(Base):
    __tablename__ = "tickets"  # Fixed: double underscores
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    date = Column(String)  # Consider using DateTime instead
    venue = Column(String)
    price = Column(Float)
    image = Column(String)
    description = Column(String)