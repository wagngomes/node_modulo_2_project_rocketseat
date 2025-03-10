import { config } from 'dotenv'
import { z } from 'zod'

if(process.env.NODE_ENV === 'test'){
    config({path: '.env.test'})
}else{
    config()
}

const envSchema = z.object({

    NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
    DATABASE_URL: z.string(),
    DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
    PORT: z.coerce.number().default(3333)

})

export const _env = envSchema.safeParse(process.env)

if(_env.success === false){
    console.error('Variavel de ambiente não encontrada');
    throw new Error('invalid environment var')
}

export const env = _env.data