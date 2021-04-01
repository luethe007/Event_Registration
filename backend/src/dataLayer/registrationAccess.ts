import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { Registration } from '../models/Registration'

const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)
const logger = createLogger('RegistrationAccess')

export class RegistrationAccess {
    constructor(
      private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
      private readonly registrationTable = process.env.REGISTRATION_TABLE,
      private readonly index = process.env.INDEX
    ) {}
  
    async getAllRegistrations(userId: string): Promise<Registration[]> {
      logger.info('Fetch all registrations')
  
      var params = {
        TableName: this.registrationTable,
        IndexName: this.index,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      }
  
      const result = await this.docClient.query(params).promise()
      return result.Items as Registration[]
    }
  
    async register(registration: Registration): Promise<Registration> {
      logger.info('Register for an event')
  
      var params = {
        TableName: this.registrationTable,
        Item: registration
      }
  
      await this.docClient.put(params).promise()
  
      return registration
    }
  
  
    async deleteRegistration(eventId: string, userId: string): Promise<void> {
      logger.info('Delete registration', { eventId, userId })
      const params = {
        TableName: this.registrationTable,
        Key: {
          eventId: eventId,
          userId: userId
        },
        ExpressionAttributeValues: {
          ':userId': userId
        },
        ConditionExpression: 'userId = :userId'
      }
  
      await this.docClient.delete(params).promise()
  
      return
    }
  }
