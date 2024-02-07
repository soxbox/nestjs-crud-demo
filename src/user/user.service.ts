import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

interface UserDto {
    id: number;
    name: string;
    email: string;
    friend?: UserDto[]
}

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<UserDto | null> {
        const user = await this.prisma.user.findUnique({
            where: userWhereUniqueInput,
            include: {
                friend: {
                    include: {
                        friendBy: true
                    }
                },
            },
        });
        return user ? {
            ...user, friend: user.friend.map(({ friendBy }) => friendBy)
        } : null
    }

    async users(params: {
        skip?: number;
        take?: number;
        select?: Prisma.UserSelect;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }

    // startDepth: 0 includes yourself and friends, 1 includes your firends, 2 only friend recomendations
    // depth: determines how deep it can loop
    async friendRecomendation(id: number, startDepth = 2, depth = 10): Promise<{ id: number, name: string, depth: number, distance: number }[]> {
        const rows: { id: number, name: string, depth: number }[] = await this.prisma.$queryRawUnsafe(`
            with recursive FriendCTE (PersonID, depth) as (
                select $1, 0
                union
                select pf."friendById", depth + 1
                from FriendCTE cte
                join "Friend" as pf on cte.PersonID = pf."userById"
                where depth < $2
            ),
            fs as (
                select 
                    PersonID as id, Name, depth,
                    ROW_NUMBER() OVER(PARTITION BY PersonID ORDER BY depth asc) as FirstRow
                from FriendCTE cte
                join "User" u on u.id = cte.PersonID
            )
            select id::int, name, depth::int from fs 
            where fs.FirstRow=1 and depth >= $3
        `, id, depth, startDepth)

        return rows.map((row) => ({ ...row, distance: Number(row.depth) - startDepth + 1 }))
    }
}
