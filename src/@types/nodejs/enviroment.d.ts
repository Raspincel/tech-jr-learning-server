export{}

declare global {
    namespace NodeJS {
      export interface ProcessEnv {
        PORT: number,
        DATABASE_URL: string,
        SECRET_KEY: string,
        SMTP_HOST: string,
        SMTP_PORT: number
        SMTP_USER: string
        SMTP_PASS: string
      }
    }
}