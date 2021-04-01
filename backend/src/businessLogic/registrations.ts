import { Registration } from '../models/Registration'
import { RegistrationRequest } from '../requests/RegistrationRequest'
import { RegistrationAccess } from '../dataLayer/registrationAccess'

const registrationAccess = new RegistrationAccess()

export async function getAllRegistrations(userId: string): Promise<Registration[]> {
  return await registrationAccess.getAllRegistrations(userId)
}

export async function register(
  registrationRequest: RegistrationRequest,
  userId: string
): Promise<Registration> {

  return await registrationAccess.register({
    userId: userId,
    eventId: registrationRequest.eventId,
    name: registrationRequest.name
  })
}

export async function deleteRegistration(
  eventId: string,
  userId: string
): Promise<void> {
  return await registrationAccess.deleteRegistration(eventId, userId)
}
