from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session 
from typing import List
from datetime import datetime
from backend.database import engine, SessionLocal
from backend.models import Base, Event
from backend import schemas

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Event Management API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
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

def sample_data():
    db = SessionLocal()
    try:
        if db.query(Event).count() == 0:
            sample_events = [
               Event(
                    id=1,
                    image="https://admin.ticketmojo.co.ke//storage/events/main_photo_1746873032.jpg",
                    name="Project X!",
                    genre="Music",
                    date="2025-06-27",
                    location="TBA",
                    organizer="House of Music Entertainment",
                    rating=5.0,
                    reviews=[],
                    ticket="https://ticketmojo.co.ke/event/project-x!#buy-ticket"
                ),

                Event(
                    id=2,
                    image="https://admin.ticketmojo.co.ke//storage/events/main_photo_1748776427.png",
                    name="Soul-Tie",
                    genre="Music",
                    date="2025-06-01",
                    location="Moov Bar & Bistro",
                    organizer=None,
                    rating=5.0,
                    reviews=[],
                    ticket="https://ticketmojo.co.ke/event/soul-tie#buy-ticket"
                ),

                Event(
                    id=3,
                    image="https://admin.ticketmojo.co.ke//storage/events/main_photo_1748197127.jpeg",
                    name="MOTHERLAND BRUNCH 1.2",
                    genre="Food",
                    date="2025-08-09",
                    location="REPLAY, BROADWALK MALL",
                    organizer="Flickshub",
                    rating=5.0,
                    reviews=[],
                    ticket="https://ticketmojo.co.ke/event/motherland-brunch-1.2#buy-ticket"
                ),

                Event(
                    id=4,
                    image="https://admin.ticketmojo.co.ke//storage/events/main_photo_1747827480.jpg",
                    name="MAMBO JANGOR",
                    genre="Traditional",
                    date="2025-06-12",
                    location="Old Kings Castle -Rongai",
                    organizer="MAMBO JANGOR",
                    rating=5.0,
                    reviews=[],
                    ticket="https://ticketmojo.co.ke/event/mambo-jangor#buy-ticket"
                ),

                Event(
                    id=5,
                    image="https://admin.ticketmojo.co.ke//storage/events/main_photo_1747816947.png",
                    name="Crafting Compelling Landing pages for B2C and B2B Startups.",
                    genre="Technology",
                    date="2025-06-12",
                    location="Brew Bistro Ngong Road",
                    organizer=" Kenyan Indie Hackers",
                    rating=5.0,
                    reviews=[],
                    ticket="https://ticketmojo.co.ke/event/kenyan-indie-hackers#buy-ticket"
                ),

                Event(
                    id=6,
                    image="https://admin.ticketmojo.co.ke//storage/events/main_photo_1747731045.jpeg",
                    name="RNB SOUL OUT PRE-TOUR (M...",
                    genre="Music",
                    date="2025-06-07",
                    location="CURLTURE AT LUNA",
                    organizer="Soul Out Festival",
                    rating=5.0,
                    reviews=[],
                    ticket="https://ticketmojo.co.ke/event/rnb-soul-out-pre-tour-(meru)#buy-ticket"
                ),

                Event(
                    id=7,
                    image="https://admin.ticketmojo.co.ke//storage/events/main_photo_1747727949.JPG",
                    name="Anime Watch Party 2",
                    genre="Film",
                    date="2025-07-05",
                    location="Mohinder's Resraurant",
                    organizer="Epic Ventors",
                    rating=5.0,
                    reviews=[],
                    ticket="https://ticketmojo.co.ke/event/anime-watch-party-2#buy-ticket"
                ),

                Event(
                    id=8,
                    image="https://admin.ticketmojo.co.ke//storage/events/main_photo_1747636461.jpg",
                    name="Drinks on Deck",
                    genre="Party",
                    date="2025-07-04",
                    location="Diani",
                    organizer="Fallen x Arctic",
                    rating=5.0,
                    reviews=[],
                    ticket="https://ticketmojo.co.ke/event/drinks-on-deck#buy-ticket"
                ),

                Event(
                    id=12,
                    image="https://admin.ticketmojo.co.ke//storage/events/main_photo_1740592394.png",
                    name="Chibweza Cup 3",
                    genre="Sports",
                    date="2025-08-16",
                    location="TBA",
                    organizer="Chibweza Cup",
                    rating=5.0,
                    reviews=[],
                    ticket="https://ticketmojo.co.ke/event/chibweza-cup-3#buy-ticket"
                ),

                Event(
                    id=13,
                    image="https://admin.ticketmojo.co.ke//storage/events/main_photo_1736344184.png",
                    name="LAUNCH PARTY",
                    genre="Party",
                    date="2025-04-04",
                    location="Nova Apartments",
                    organizer="Fantasy Fiesta KE",
                    rating=5.0,
                    reviews=[],
                    ticket="https://ticketmojo.co.ke/event/launch-party#buy-ticket"
                )
            ]
            db.add_all(sample_events)
            db.commit()
    except Exception as e:
        print(f"Error initializing data: {e}")
        db.rollback()
    finally:
        db.close()

@app.on_event("startup")
async def startup():
    sample_data()


@app.get("/")
async def root():
    return {"message": "Event Management API", "version": "1.0.0"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.get("/events/", response_model=List[schemas.EventResponse])
def get_events(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    """Get all events with pagination"""
    return db.query(Event).offset(skip).limit(limit).all()

@app.post("/events/", response_model=schemas.EventResponse, status_code=201)
def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    """Create new event"""
    try:
        db_event = Event(**event.model_dump())
        db.add(db_event)
        db.commit()
        db.refresh(db_event)
        return db_event
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/events/{event_id}", response_model=schemas.EventResponse)
def get_event(event_id: int, db: Session = Depends(get_db)):
    """Get single event by ID"""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@app.put("/events/{event_id}", response_model=schemas.EventResponse)
def update_event(event_id: int, event: schemas.EventUpdate, db: Session = Depends(get_db)):
    """Update event"""
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    try:
        update_data = event.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_event, key, value)
        
        db.commit()
        db.refresh(db_event)
        return db_event
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/events/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db)):
    """Delete event"""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    try:
        db.delete(event)
        db.commit()
        return {"message": "Event deleted", "id": event_id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/events/{event_id}/review")
def add_review(event_id: int, review: dict, db: Session = Depends(get_db)):
    """Add review to event"""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    try:
        if event.reviews is None:
            event.reviews = []
        
        review['timestamp'] = datetime.now().isoformat()
        event.reviews.append(review)
        
        db.commit()
        db.refresh(event)
        return {"message": "Review added", "reviews": event.reviews}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))