import { Request, Response } from "express";
import { late, z } from "zod";
import { eventsDb } from "../../..";
import { respondWithError } from "../../Routes/v1/errorHandling";

export const getEventsBody = z.object({
    cursor: z.string().regex(/^(?:[a-zA-Z0-9]+_)+[a-zA-Z0-9]+$/, {
        message: "Invalid KSULID format. It should have segments separated by '_' and ending with alphanumeric characters.",
      }).optional(),
    limit: z.coerce.number().min(0).max(100).default(10),
    search: z.string().optional()
});

export async function GetEvents(req: Request, res: Response)
{
    try
    {
        const queryBody = getEventsBody.parse(req.query); // guaranteed to have the queryType type thanks to the bodyValidator middleware.

        const latestEvents = await eventsDb.fetchEvents(queryBody.limit, queryBody.cursor, queryBody.search === ""? undefined : queryBody.search);
        let lastValue = null;

        if (latestEvents.length > 0)
            lastValue = latestEvents[latestEvents.length - 1].id;

        return res.status(200).send(latestEvents);
    } catch (error) {
        return respondWithError(req, res, 400, ["Invalid query params."])
    }
}