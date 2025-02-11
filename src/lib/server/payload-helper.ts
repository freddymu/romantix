import { getPayload, Payload } from 'payload'
import config from '@payload-config'

let cachedPayload: Payload | null = null

export async function getPayloadInstance() {
  if (!cachedPayload) {
    cachedPayload = await getPayload({ config })
  }
  return cachedPayload
}
