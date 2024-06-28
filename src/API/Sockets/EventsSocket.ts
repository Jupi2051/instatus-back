import { OBJECT_TYPES } from "@prisma/client"
import { wsServer } from "./Server"

export type API_Event = {
    id: string,
    object: OBJECT_TYPES,
    actor_id: string,
    group: string,
    target_id: string,
    location: string,
    occurred_at: Date,
    metadata: null,
    action_id: string,
    action: {
        id: string,
        object: OBJECT_TYPES,
        name: string
    },
    Actor: {
        id: string,
        name: string,
        email: string
    },
    target: {
        id: string,
        name: string,
        email: string
    }
}

export default function BroadcoastNewEvent(event: API_Event)
{
    wsServer.clients.forEach((client) => {
        client.send(JSON.stringify(event));
    })    
}