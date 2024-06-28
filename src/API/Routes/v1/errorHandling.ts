import { Request, Response } from "express";

export function respondWithError(req: Request, res: Response, status: number, messages: string[])
{
    res.status(status).send({
        errors: messages
    });
}