import { OBJECT_TYPES } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";

export const createEventBody = z.object({

    object: z.nativeEnum(OBJECT_TYPES),

    actor_id: z.string(),
    actor_name: z.string(),

    group: z.string(),

    target_id: z.string(),
    target_name: z.string(),

    location: z.string().ip({version: "v4"}),
    occured_at: z.date(),

    metadata: z.record(z.string().or(z.boolean()).or(z.number()))
});

type bodyType = z.infer<typeof createEventBody>

export function CreateEvent(req: Request, res: Response)
{
    const eventBody = req.body as bodyType;
    
}