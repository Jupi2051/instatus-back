import { Axios } from "axios";

export async function listEvents(client: Axios, id: string)
{
    const result = await client.get("/events/" + id);
    return result.data;
}