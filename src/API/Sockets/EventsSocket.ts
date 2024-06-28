import { OBJECT_TYPES } from "@prisma/client"
import { wsServer } from "../.."

export type API_Event = {
    id: string,
    object: OBJECT_TYPES,
    actor_id: string,
    group: string,
    target_id: string | null,
    location: string,
    occurred_at: Date,
    metadata: null | Object,
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
    } | null
}

export default function BroadcoastNewEvent(event: API_Event)
{
    console.log("attempting broadcast");
    wsServer.clients.forEach((client) => {
        console.log("broadcast.");
        client.send(JSON.stringify(event));
    })    
}