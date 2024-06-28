import prisma from "../Database";

export type eventsFiltersAndSearch = {
    actor_id?: string,
    target_id?: string,
    action_id?: string,

    actor_name?: string,
    target_name?: string,
    action_name?: string

    search?: string
}

//This uses cursor based pagination to scale and have a much more efficent performance.
export async function DB_fetchEvents(limit: number, cursor?: string, searchAndFilters?: eventsFiltersAndSearch)
{
    const result = await prisma.event.findMany({
        take: limit,
        skip: cursor? 1 : undefined, // skip the cursor if we have it.
        orderBy: [
            {
                id: "desc",
            },
        ],
        where: {
            OR: [
                {Actor: {name: {contains: searchAndFilters?.search}}},
                {action: {name: {contains: searchAndFilters?.search}}},
                {Actor: {email: {contains: searchAndFilters?.search}}},

                
                {Actor: {name: {contains: searchAndFilters?.actor_name}}},
                {target: {name: {contains: searchAndFilters?.target_name}}},
                {action: {name: {contains: searchAndFilters?.action_name}}},

                {target_id: searchAndFilters?.target_id},
                {action_id: searchAndFilters?.action_id},
                {actor_id: searchAndFilters?.actor_id},
            ]
        },
        include: {
            action: true,
            Actor: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            target: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        },
        cursor: cursor? {id: cursor} : undefined
    });
    
    return result;
}

export async function DB_fetchEvent(id: string)
{
    try
    {
        const result = await prisma.event.findFirst({
            where: {
                id: id
            },
            include: {
                action: true,
                Actor: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                target: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
        });

        return result;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}