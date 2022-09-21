## Full Stack Typescript Template

How to get started:

1. in /apps/server, rename `.env.example` to `.env`.
2. fill `DATABASE_URL` environment variable with your database url (reference: https://pris.ly/d/connection-strings).
3. in /apps/server/schema.prisma, change `datasource db -> provider` to your db provider, and also comment current `url` and un-comment `url` bellow it to use configuration in .env file.
4. run `npx prisma migrate dev` in apps/server to apply latest migration to your database.
