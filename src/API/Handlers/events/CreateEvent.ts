import { OBJECT_TYPES } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import { eventsDb } from "../../..";
import { respondWithError } from "../../Routes/v1/errorHandling";

export const createEventBody = z.object({
    actor_id: z.string(),
    group: z.string(),
    target_id: z.string().optional(),
    action_id: z.string(),
    location: z.string().ip({version: "v4"}),
    occurred_at: z.coerce.date(),
    metadata: z.record(z.string().or(z.boolean()).or(z.number()))
});

type bodyType = z.infer<typeof createEventBody>

export async function CreateEvent(req: Request, res: Response)
{
    const eventBody = req.body as bodyType;
    const yes = await eventsDb.createEvent(eventBody);
    
    if (yes) {
        return res.status(201).send({event: yes});
    } else {
        return respondWithError(req, res, 500, ["An error occured while creating the request. Please contact the site owner"])
    }
}