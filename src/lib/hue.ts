import type { Light } from '$lib/components/Light/Light';
import type { HueLight } from '$lib/types/hue';

export function convertHueLightToLight(light: HueLight, id: string): Light {
  return {
    id,
    uniqueId: light?.uniqueid,
    name: light?.name,
    type: light?.config?.archetype,
    color: {
      xy: {
        x: light?.state?.xy[0],
        y: light?.state?.xy[1],
      },
    },
    on: light?.state?.on,
    dimming: {
      brightness: light?.state?.bri,
      minDimLevel: light?.capabilities?.control?.mindimlevel,
    },
  };
}
