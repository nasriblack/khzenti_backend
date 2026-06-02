# 04/29/2026 - 03/05/2026 - 08/05/2026
- [X] Make the migration with Prisma
- [X] Authentification
    -[X] SingUp
        - [X] with false credentials (not follow the conditions)
        - [X] with truthy credentials (follow the conditions) => 
            - [X] error : SecretOrPrivate must have a value ( And i found the record on DB) : 30m
    -[X] SignIn 
    -[X] Who IAM (/me)


# 08/05/2026

- [X] Get user
- [X] Update response of get user
    => kan el user mahoch active , yotkhel lel profil mtaaeo w ychouf span ... 
    u are not active , contact the Admin
    => Age is necessary (bech y7asen el result mtaa IA) => aando dakhel fel prompt
    est la pour informer l'utilisateur , que l'age est pour les suggestions ia de meme pour location
    => l'input outfitGenerationsUsed must be disbaled in the front!!! => just to tell the user that u have an counter
- [X] Update user

# 12/05/2026
- [X] Check the number wardrobe item before uploading items
- [O] Update the number wardrobe added ( limit of the wordrobe items -7 item- and it's not premium) => Draft
- [X] get Items (wardrobe items)
- [X] get item by id
- [X] update wardrobe item
 
# 17/05/2026

- [X] create outfit 
- [X] get outfits 
- [X] get outfit by id 
- [X] update outfit 
- [X] Fix the error that come with no explaination ( just required with no field)

# 19/05/2026
- [X] Add Notes on prisma schema
- [X] Test the middelware of the AI (Authentification)
- [X] Test the ZOD validator 
- [X] add isFavorite filter 
- [ ] Test if the AI give the right weather prediction => THE AI is not able to predict the weather
    - if the AI is not good on this i need to implement this API https://www.weatherapi.com/pricing.aspx


# 22/05/2026
- [X] Implement the AI API to check the weather condition 
```https://github.com/weatherapicom/weatherapi-examples/blob/main/javascript/current.js```
        => - data.current.temp_c
        => - data.current.wind_kph
        => - data.current.cloud
        => - data.current.chance_of_rain
        => - data.current.will_it_rain



- [X] Get the Location of the connected user to send it in the prediction API 
    - [ ] Not tested !


# 02/06/2026
- [ ] it's not that logical when the user map all the wardrobeItems and send it to the prompt ( check ai.service)
    => Solution ( idea of me  ) naaemlo filter lel items bel weather eli mawjoud => maanaha kan it's cloudy w fama wind donc bech naaemlo filter aal hwayj chte   
- [ ] Get the weather API response and used in the recommendation outfit
- [ ] Add Real Image in DB to test with them
- [ ] Generate recommendation with AI 
- [ ] kan el user maandoch item fi khzenato , el ai mayaamloch generation outfit ! mais y9olo chnoa telbes w yensho 
