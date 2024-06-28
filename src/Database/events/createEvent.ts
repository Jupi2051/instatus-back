import prisma from "../Database";
import { z } from "zod";
import { createEventBody } from "../../API/Handlers/events/CreateEvent";
import KSUID from "ksuid";

export type object_creation_event = z.infer<typeof createEventBody>



export async function DB_createEvent(event: object_creation_event)
{
    try
    {
        const id = KSUID.randomSync(event.occured_at).string; // generate ksuid for time of now.

        const result = await prisma.event.create({
            data: {
                id: `evt_${id}`,
                location: event.location,
                object: "event",
                action: {
                    connect: {id: event.action_id}
                },
                occurred_at: event.occured_at,
                group: event.group,
                Actor: {
                    connect: {id: event.actor_id}
                },
                target: event.target_id? {connect: {id: event.target_id}} : undefined,
            }
        });

        return result;
    }
    catch (error) {
        console.log(error)
        return false;
    }
}