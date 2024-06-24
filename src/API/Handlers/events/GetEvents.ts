import { Request, Response } from "express";
import { z } from "zod";

export const getEventsBody = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).default(1)
});

type queryType = z.infer<typeof getEventsBody>

export function GetEvents(req: Request, res: Response)
{
    const queryBody = req.query as unknown as queryType; // guaranteed to have the queryType type thanks to the bodyValidator middleware.
    
}