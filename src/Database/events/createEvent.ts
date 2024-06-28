import prisma from "../Database";
import { z } from "zod";
import { createEventBody } from "../../API/Handlers/events/CreateEvent";
import KSUID from "ksuid";

export type object_creation_event = z.infer<typeof createEventBody>



export async function DB_createEvent(event: object_creation_event)
{
    try
    {
        const id = KSUID.randomSync(new Date()).string; // generate ksuid for time of now.

        const result = await prisma.event.create({
            data: {
                id: `evt_${id}`,
                location: event.location,
                object: event.object,
                action: {
                    create: event.action
                },
                occurred_at: new Date(),
                group: event.group,
                Actor: {
                    create: event.actor
                },
                target: event.target? {
                    create: event.target
                } : undefined
            }
        });

        return result;
    }
    catch (error) {
        console.log(error)
        return false;
    }
}