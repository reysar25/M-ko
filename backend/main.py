from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session 
from sqlalchemy import inspect
from typing import List
from backend.database import engine, SessionLocal
from backend.models import Base, Ticket
from backend import schemas
import os

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def initialize_sample_data():
    """Populate the database with sample ticket data"""
    db = SessionLocal()
    try:
        inspector = inspect(engine)
        if not inspector.has_table("tickets"):
            return
            
        if db.query(Ticket).count() == 0:
            sample_tickets = [
                Ticket(
                    name="Drake Night Party",
                    date="2025-05-16",
                    venue="The Alchemist Bar, Westlands, Nairobi",
                    price=10.00,
                    image="https://i.pinimg.com/736x/fc/bb/68/fcbb68d0595741235cd99c5db18934d0.jpg",
                    description="A high-energy nightclub event..."
                ),
                Ticket(
                    name="Ciza's Palace",
                    date="2025-05-23",
                    venue="KIZA Restaurant and Lounge, Kilimani, Nairobi",
                    price=15.00,
                    image="https://i.pinimg.com/736x/00/67/a8/0067a8c9eec0dc319a35f610a8f7445d.jpg",
                    description="An upscale nightlife event..."
                ),
                Ticket(
                    name="Nairobi Street Food Kitchen",
                    date="2025-06-07",
                    venue="Ballpoint Social Club, Nairobi",
                    price=12.00,
                    image="https://via.placeholder.com/300?text=Food+Festival",
                    description="A culinary festival showcasing Nairobi's street food culture"
                ),
                Ticket(
                    name="Abantu",
                    date="2025-06-14",
                    venue="The Tunnel, Mombasa Road, Nairobi",
                    price=8.00,
                    image="https://via.placeholder.com/300?text=Abantu",
                    description="Cultural music and dance event"
                ),
                Ticket(
                    name="Afro Beats Day Party",
                    date="2025-06-21",
                    venue="Sky Lounge, Emara Ole Sereni Hotel",
                    price=10.00,
                    image="https://via.placeholder.com/300?text=Afro+Beats",
                    description="Daytime party celebrating Afrobeats"
                ),
                Ticket(
                    name="GTR East Africa 2025",
                    date="2025-05-21",
                    venue="JW Marriott Hotel Nairobi",
                    price=100.00,
                    image="https://via.placeholder.com/300?text=GTR",
                    description="Trade and export financing event"
                ),
                Ticket(
                    name="Nairobi TravelExpo 2025",
                    date="2025-05-30",
                    venue="Sarova Panafric Hotel",
                    price=25.00,
                    image="https://via.placeholder.com/300?text=TravelExpo",
                    description="Tourism expo promoting African travel"
                ),
                Ticket(
                    name="Circle Art Gallery Exhibition",
                    date="2025-06-05",
                    venue="Circle Art Gallery, Nairobi",
                    price=15.00,
                    image="https://via.placeholder.com/300?text=Art+Exhibition",
                    description="Contemporary works by local artists"
                )
            ]
            db.add_all(sample_tickets)
            db.commit()
    except Exception as e:
        print(f"Error initializing data: {str(e)}")
    finally:
        db.close()

@app.on_event("startup")
async def startup_event():
    initialize_sample_data()

@app.post("/tickets/", response_model=schemas.TicketResponse)
def create_ticket(ticket: schemas.TicketCreate, db: Session = Depends(get_db)):
    """Create a new ticket"""
    db_ticket = Ticket(**ticket.model_dump())
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket

@app.get("/tickets/", response_model=List[schemas.TicketResponse])
def read_tickets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get list of tickets with pagination"""
    return db.query(Ticket).offset(skip).limit(limit).all()

@app.get("/tickets/{ticket_id}", response_model=schemas.TicketResponse)
def read_ticket(ticket_id: int, db: Session = Depends(get_db)):
    """Get a specific ticket by ID"""
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@app.put("/tickets/{ticket_id}", response_model=schemas.TicketResponse)
def update_ticket(ticket_id: int, ticket: schemas.TicketCreate, db: Session = Depends(get_db)):
    """Update an existing ticket"""
    db_ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not db_ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    for key, value in ticket.model_dump().items():
        setattr(db_ticket, key, value)
    
    db.commit()
    db.refresh(db_ticket)
    return db_ticket

@app.delete("/tickets/{ticket_id}")
def delete_ticket(ticket_id: int, db: Session = Depends(get_db)):
    """Delete a ticket"""
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    db.delete(ticket)
    db.commit()
    return {"message": "Ticket deleted successfully"}

@app.get("/")
async def root():
    """API root endpoint"""
    return {"message": "Ticket API is running"}