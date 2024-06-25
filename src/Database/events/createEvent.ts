import { ulid } from "ulidx";
import prisma from "../Database";
import { z } from "zod";
import { createEventBody } from "../../API/Handlers/events/CreateEvent";

export type object_creation_event = z.infer<typeof createEventBody>

export async function DB_createEvent(event: object_creation_event)
{
    const id = ulid();

    await prisma.event.create({
        data: {
            id: id,
            location: event.location,
            object: event.object,
            action: {
                create: event.action
            },
            occurred_at: new Date(),
            target_id: event.target_id,
            target_name: event.target_name,
            actor_id: event.actor_id,
            actor_name: event.actor_name,
            group: event.group,
        }
    });

    return true;
}