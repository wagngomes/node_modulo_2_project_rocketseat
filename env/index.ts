import { config } from 'dotenv'
import { z } from 'zod'

if(process.env.NODE_ENV === 'test'){
    config({path: '.env.test'})
}else{
    config()
}

const envSchema = z.object({

    DATABASE_URL: z.string()

})

export const _env = envSchema.safeParse(process.env)

if(_env.success === false){
    console.error('Variavel de ambiente não encontrada');
    throw new Error('invalid environment var')
}

export const env = _env.data