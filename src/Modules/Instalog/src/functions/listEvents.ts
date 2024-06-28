import { Axios } from "axios";

export type eventsFiltersAndSearch = {
    actor_id?: string,
    target_id?: string,
    action_id?: string,

    actor_name?: string,
    target_name?: string,
    action_name?: string

    search?: string
}


export async function listEvents(client: Axios, filters?: eventsFiltersAndSearch, limit: number = 10, cursor: string | undefined = undefined)
{
    const result = await client.get("/events", {
        params: {
            limit,
            cursor,
            ...filters
        }
    });

    return result.data;
}