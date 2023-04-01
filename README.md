# Yassir-challenge

Yassir coding Challenge submission

# Project Preparation

make sure you have a running mysql instance
update .env with DB credentials as follows:-

```
TYPEORM_HOST= DB_IP // eg. 127.0.0.1
TYPEORM_PORT=DB PORT // eg. 3306
TYPEORM_DATABASE=SCEHAMA_NAME // eg. air_quality
TYPEORM_USERNAME=USERNAME // eg. air_quality
TYPEORM_PASSWORD=PASSWORD // eg. air_quality_password
```

to run migrations
```
npm run migrate
```

# Test
```
npm run test
```

# To Run the project
```
npm install
npm run build
npm start
```

# Swagger
```
http://localhost:3000/api-docs/swagger/
```


