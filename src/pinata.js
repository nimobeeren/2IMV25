const urlSearchParams = new URLSearchParams(window.location.search)
const params = Object.fromEntries(urlSearchParams.entries())

const details = {
  pinata_api_key: params.apiKey,
  pinata_secret_api_key: params.secretApiKey
}

const enabled = details.pinata_api_key && details.pinata_secret_api_key

if (!enabled) {
  console.warn('Logging disabled: apiKey and secretApiKey not present in the URL Query.')
}

export const storePinata = enabled ? ({ content, name }) => fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
  method: 'POST',
  body: JSON.stringify({
    pinataContent: content,
    pinataMetadata: {
      name: name
    }
  }),
  headers: {
    'Content-Type': 'application/json',
    ...details
  }
}) : () => console.warn('Logging disabled.')
