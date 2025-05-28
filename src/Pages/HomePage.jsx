import { useEffect, useState } from "react"
import EventCard from "../Components/EventCard"
''
function HomePage() {
    const [events, setEvents] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/events")
            .then(res => res.json())
            .then(data => {            
                setEvents(data)
                console.log(events);
            
            })
    },[])
    return (
    <>
            <div className="flex flex-wrap overflow-auto gap-4">
                {events.map((event, index) =>(
                    <EventCard event={event} key ={index}/>
                    )
        )}        
        </div>        
    </>
 )
}

export default HomePage;