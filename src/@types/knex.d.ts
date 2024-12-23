import knex from "knex";

declare module 'knex/types/tables'{
    export interface tables{
        transactions: {
            id: string,
            title: string,
            amount: number,
            createdAt: string,
            session_id: string
        }
    }
}