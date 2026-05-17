- if u want to make a migration in existing DB :
    1- i run this command ``` pnpm dlx prisma db:pull ```  => sync with the migration and model prisma
    2- i delete the property from the prisma model 
    3- i made the migration  ```pnpm prisma migrate dev --name remove-age-column```
    4- i made the generated file  ```pnpm prisma:generate```