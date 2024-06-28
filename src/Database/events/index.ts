import { DB_createEvent, object_creation_event } from "./createEvent";
import { DB_fetchEvent, DB_fetchEvents } from "./fetchEvents";

export default class eventsDb {
    fetchEvent = (id: string) => DB_fetchEvent(id);
    fetchEvents = (limit: number, cursor?: string, search?: string) => DB_fetchEvents(limit, cursor, search);
    createEvent = (object: object_creation_event) => DB_createEvent(object);
}