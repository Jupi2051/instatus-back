import {prisma} from "./Database/index";

import KSUID from "ksuid";

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

const ActionType = {
    USER_LOGGED_IN: "id",
    USER_LOGGED_OUT: "id",
    INCIDENT_CREATED: "id",
    INCIDENT_RESOLVED: "id",
    INCIDENT_DELETED: "id"
  };

  const actions = Object.entries(ActionType);

const seedData = async () => {
    try {
        for (const [name, id] of actions) {
            const newId = KSUID.randomSync(new Date()).string;
            const evtActId = `evt_act_${newId}`;
        
            const result = await prisma.eventAction.create({
              data: {
                id: evtActId,
                object: "event_action",
                name: name,
              }
            });
            console.log(result);
        console.log('Seeding completed.');
    }
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await prisma.$disconnect();
    }
};

seedData();