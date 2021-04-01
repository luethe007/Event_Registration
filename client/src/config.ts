// Backend API ID that the Frontend can refer to
const apiId = '98v7qu39i1'
export const apiEndpoint = `https://${apiId}.execute-api.eu-central-1.amazonaws.com/dev`

export const authConfig = {
  domain: 'luetify.eu.auth0.com',                        // Auth0 domain
  clientId: 'PoxopSrtcOKFWe1OiRtY12A0comuCO4O',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'          // Callback URL
}
