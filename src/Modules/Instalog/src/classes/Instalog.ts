import axios, { Axios } from "axios";
import { eventsFiltersAndSearch, listEvents } from "../functions/listEvents";
import { ActionType, createEvent, createEventData } from "../functions/createEvent";

class Instalog {
    private API_URL: string = "http://localhost:5000";
    private client: Axios;

    constructor (SECRET_KEY: string) {
        this.client = axios.create({
            baseURL: this.API_URL,
            headers: {
                Authorization: `Bearer ${SECRET_KEY}`
            }
        });
    }

    createEvent = async (action: ActionType, event: createEventData) => createEvent(this.client, action, event);

    listEvents = async (filters?: eventsFiltersAndSearch, limit?: number, cursor?: string) => await listEvents(this.client, filters, limit, cursor)
}

export default Instalog;