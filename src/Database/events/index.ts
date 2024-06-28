import { DB_createEvent, object_creation_event } from "./createEvent";
import { DB_fetchEvent, DB_fetchEvents, eventsFiltersAndSearch } from "./fetchEvents";

export default class eventsDb {
    fetchEvent = (id: string) => DB_fetchEvent(id);
    fetchEvents = (limit: number, cursor?: string, searchAndFilters?: eventsFiltersAndSearch) => DB_fetchEvents(limit, cursor, searchAndFilters);
    createEvent = (object: object_creation_event) => DB_createEvent(object);
}