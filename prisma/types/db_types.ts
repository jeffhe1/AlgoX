import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const UserData = Prisma.validator<Prisma.UserInclude>()({
    portfolios: {
        include: {
            holdings: true,
        },
    },
});
export type UserData = Prisma.UserGetPayload<{include : typeof UserData}>;