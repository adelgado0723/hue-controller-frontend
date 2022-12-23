import { BRIDGE_IP } from '$env/static/private'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = () => {
  return { defaultIP: BRIDGE_IP }
}

