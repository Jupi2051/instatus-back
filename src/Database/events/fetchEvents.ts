import prisma from "../Database";

//This uses cursor based pagination to scale and have a much more efficent performance.
export async function DB_fetchEvents(limit: number, cursor?: string, search?: string)
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
                {
                    Actor: {name: {contains: search}}
                },
                {
                    Actor: {email: {contains: search}}
                },
                {
                    action: {name: {contains: search}}
                },
                
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