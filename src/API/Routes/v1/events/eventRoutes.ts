import express from "express";
import BodyValidator, { objectToValidate } from "../../../Middleware/BodyValidator";
import { CreateEvent, createEventBody } from "../../../Handlers/events/CreateEvent";
import { GetEvents, getEventsBody } from "../../../Handlers/events/GetEvents";
import { GetEvent } from "../../../Handlers/events/GetEvent";
import PauseUntilNext from "../../../Middleware/PauseUntilNext";

const router = express.Router();

router.post("/events", BodyValidator({schema: createEventBody, validateTarget: objectToValidate.BODY}), CreateEvent);
router.get("/events", BodyValidator({schema: getEventsBody, validateTarget: objectToValidate.QUERY}), GetEvents);
router.get("/events/:id", PauseUntilNext(1000), GetEvent)

export default router;