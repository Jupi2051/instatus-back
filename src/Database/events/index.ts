import { DB_createEvent, object_creation_event } from "./createEvent";
import { DB_fetchEvents } from "./fetchEvents";

export default class eventsDb {
    fetchEvents = (limit: number, cursor?: string) => DB_fetchEvents(limit, cursor);
    createEvent = (object: object_creation_event) => DB_createEvent(object);
}