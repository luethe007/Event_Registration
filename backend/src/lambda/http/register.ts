import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { RegistrationRequest } from '../../requests/RegistrationRequest'
import  { register } from '../../businessLogic/registrations'
import { getUserId } from '../utils'

var aws = require('aws-sdk');
var ses = new aws.SES({ region: 'eu-central-1' });

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)
  const newRequest: RegistrationRequest = JSON.parse(event.body)
  const userId = getUserId(event)
  const newRegistration = await register(newRequest, userId)

  var params = {
    Destination: {
      ToAddresses: [process.env.MAIL_TO],
    },
    Message: {
      Body: {
        Text: { Data: 'The following event has been registered ' + newRequest.name },
      },
      Subject: { Data: "New event registration" },
    },
    Source: process.env.MAIL_FROM,
  };
  
  await ses.sendEmail(params).promise()

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      message: "New event registered",
      item: newRegistration
    })
  }
}
