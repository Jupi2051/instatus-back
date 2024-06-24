import express from "express";
import BodyValidator, { objectToValidate } from "../../Middleware/BodyValidator";
import { CreateEvent, createEventBody } from "../../Handlers/events/CreateEvent";
import { GetEvents, getEventsBody } from "../../Handlers/events/GetEvents";

const router = express.Router();

router.post("/events", BodyValidator({schema: createEventBody, validateTarget: objectToValidate.BODY}), CreateEvent);
router.get("/events", BodyValidator({schema: getEventsBody, validateTarget: objectToValidate.QUERY}), GetEvents);

export default router;