import { Axios } from "axios"

export enum ActionType {
    USER_LOGGED_IN = "id",
    USER_LOGGED_OUT = "id",
    INCIDENT_CREATED = "id",
    INCIDENT_RESOLVED = "id",
    INCIDENT_DELETED = "id"
}

function getUTCTime() : Date
{
    return new Date(new Date().toUTCString())
}

export type createEventData = {
    actor_id: string,
    target_id?: string,
    location: string,
    occured_at?: Date,
    metadata?: Object
    group: string
}

export async function createEvent(client: Axios, action: ActionType, event: createEventData)
{
    const result = await client.post("/events", {
        ...event,
        action_id: action,
        occured_at: event.occured_at?? getUTCTime()
    });

    return result.status === 201;
}