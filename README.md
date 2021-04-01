# Serverless Event Registration

I implemented an event registration application using AWS Lambda and Serverless framework. This is the capstone project of the Udacity Cloud Developer Nanodegree Program. The idea behind this is to enable people to create an event and register it on a platform. Once an event has been created, it will be stored in an AWS DynamoDB table, shown on the UI and the administrators will receive a notification via mail using AWS SES.

Registrations are stored in an AWS DynamoDB table:

```json
{
  "registrations": [
    {
      "userId": "google-oauth2|116856787760534301498",
      "eventId": "127a259c-1893-4e8a-aadb-9dc3894add56",
      "name": "Marathon Hamburg"
    },
    {
      "userId": "google-oauth2|116858487706334300198",
      "eventId": "2efbb63e-3c24-44f0-8f71-486dc82cfa72",
      "name": "8km Alster Run"
    },
  ]
}
```

The notification mail looks like this: 
![AWS Mail](images/aws-mail.png?raw=true "AWS Mail")


# How to run the application

## Backend

To deploy the application run the following commands:

```
cd backend
npm install
sls deploy -v --aws-profile serverless --region eu-central-1
```

X-Ray visualization of the backend:  
![X-Ray Map](images/x-ray-map.png?raw=true "X-Ray Map")

## Frontend

To run the React client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

This should start a local server (http://localhost:3000/) with the React application that will interact with the serverless backend on AWS.
