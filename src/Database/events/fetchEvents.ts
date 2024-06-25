import prisma from "../Database";

//This uses cursor based pagination to scale and have a much more efficent performance.
export async function DB_fetchEvents(limit: number, cursor?: string)
{
    const result = await prisma.event.findMany({
        take: limit,
        skip: cursor? 1 : undefined, // skip the cursor if we have it.
        orderBy: {
            occurred_at: "desc",
            id: 'asc'
        },
        include: {
            action: true
        },
        cursor: cursor? {
            id: cursor
        } : undefined
    });
    
    return result;
}