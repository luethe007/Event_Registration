import { apiEndpoint } from '../config'
import { Registration } from '../types/Registration';
import { RegistrationRequest } from '../types/RegistrationRequest';
import Axios from 'axios'

export async function getRegistrations(idToken: string): Promise<Registration[]> {
  console.log('Fetching registrations')

  const response = await Axios.get(`${apiEndpoint}/registrations`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Registrations:', response.data)
  return response.data.items
}

export async function register(
  idToken: string,
  newRegistration: RegistrationRequest
): Promise<Registration> {
  const response = await Axios.post(`${apiEndpoint}/registrations`,  JSON.stringify(newRegistration), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export async function deleteRegistration(
  idToken: string,
  eventId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/registrations/${eventId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}
