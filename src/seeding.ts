import { OBJECT_TYPES } from "@prisma/client";

import {prisma} from "./Database/index";

import { ulid } from "ulidx";
import KSUID from "ksuid";

const { z } = require('zod');

// Define the action schema using Zod
const actionSchema = z.object({
  id: z.string().ulid(),
  object: z.nativeEnum(OBJECT_TYPES),
  name: z.string().min(0).max(4096)
});

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

const seedData = async () => {

    try {
        for (let i = 0; i < 5000; i++) {
            await delay(20);
            const id =  `evt_${KSUID.randomSync(new Date()).string}`;
            const action = {
                id: `evt_action_${KSUID.randomSync().string}`,
                object: OBJECT_TYPES.event_action,
                name: `Action Name ${i}`
            };

            const res = await prisma.event.create({
                data: {
                    id: id,
                    location: `Location ${i % 10}`,
                    occurred_at: new Date(),
                    
                    Actor: {
                        create: {
                            id: `user_${KSUID.randomSync().string}`,
                            email: `email${i % 15}@gmail.com`,
                            name: `name${i % 15}`
                        }
                    },
                    target: {
                        create: {
                            id: `user_${KSUID.randomSync().string}`,
                            email: `email${i % 20}@gmail.com`,
                            name: `name${i % 20}`
                        }
                    },
                    
                    group: `Group ${i % 8}`,
                    object: "event",
                    action: {
                        create: action
                    }                    
                }
            })
        }
        
        console.log('Seeding completed.');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await prisma.$disconnect();
    }
};

seedData();