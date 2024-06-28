import { Request, Response } from "express";
import { eventsDb } from "../../..";
import { z } from "zod";
import { respondWithError } from "../../Routes/v1/errorHandling";

const idParamSchema = z.object({
    id: z.string()
});

export async function GetEvent(req: Request, res: Response)
{
    const result = idParamSchema.safeParse(req.params);
    if (result.error) {
        return respondWithError(req, res, 400, [result.error.message]);
    }
    
    const data = await eventsDb.fetchEvent(result.data.id);
    if (data)
        res.status(200).send(data);
    else if (data === undefined)
        return respondWithError(req, res, 404, ["event with this id does not exist."]);
    else if (data === false)
        return respondWithError(req, res, 500, ["Server error while fetching this event"]);
}