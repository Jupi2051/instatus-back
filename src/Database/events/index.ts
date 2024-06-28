import { BroadcoastNewEvent } from "../../API/Sockets";
import { DB_createEvent, object_creation_event } from "./createEvent";
import { DB_fetchEvent, DB_fetchEvents, eventsFiltersAndSearch } from "./fetchEvents";

export default class eventsDb {
    fetchEvent = async (id: string) => await DB_fetchEvent(id);
    fetchEvents = async (limit: number, cursor?: string, searchAndFilters?: eventsFiltersAndSearch) => await DB_fetchEvents(limit, cursor, searchAndFilters);
    createEvent = async (object: object_creation_event) => {
        const createdObject = await DB_createEvent(object);
        if (createdObject) {
            BroadcoastNewEvent({
                id: createdObject.id,
                action: createdObject.action,
                action_id: createdObject.action_id,
                Actor: createdObject.Actor,
                actor_id: createdObject.actor_id,
                group: createdObject.group,
                location: createdObject.location,
                metadata: createdObject.metadata,
                object: createdObject.object,
                occurred_at: createdObject.occurred_at,
                target: createdObject.target,
                target_id: createdObject.target_id,
            });
        }
        return createdObject;
    };
}