import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";

export enum objectToValidate {
    BODY,
    QUERY
}

type BodyValidatorOptions = {
    schema: z.ZodObject<any, any>,
    validateTarget?: objectToValidate
}

export default function BodyValidator(options: BodyValidatorOptions) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            options.schema.parse(options.validateTarget === objectToValidate.QUERY ? req.query : req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));

                return res.status(400).send({
                    error: errorMessages
                });

            } else { 
                return res.status(500).send({
                    errors: ["Internal Server Error While validating your request. Please contact the website owner."]
                });
            }
        }
    }
}