import { PUBLIC_BRIDGE_IP, PUBLIC_BRIDGE_USERNAME } from '$env/static/public';
import type { Light } from '$lib/types/protocol';
import type { GroupRow, Groups } from '$lib/types/protocol';
import { convertHueLightToLight } from '$lib/hue';
import type { HueLight, HueLights, HueGroups } from '$lib/types/hue';
import { error } from '@sveltejs/kit';
import type { PageLoad, PageData } from './$types';
import { GroupType } from '$lib/constants';

export const ssr = false;

export const load: PageLoad = (async (): Promise<
PageData | { lights: Light[]; groups: Groups }
> => {
  try {
    const opts = {
      method: 'GET',
    };

    const getLightsRes = await fetch(
      `http://${PUBLIC_BRIDGE_IP}/api/${PUBLIC_BRIDGE_USERNAME}/lights`,
      opts,
    );

    const lightData: HueLights = await getLightsRes.json();
    if (!lightData) {
      throw error(500, 'No light data returned from bridge');
    }
    const lights = Object.keys(lightData).map((key): Light => {
      const light: HueLight = lightData[key];
      return convertHueLightToLight(light, key);
    });

    const getGroupsRes = await fetch(
      `http://${PUBLIC_BRIDGE_IP}/api/${PUBLIC_BRIDGE_USERNAME}/groups`,
      opts,
    );

    const groupData: HueGroups = await getGroupsRes.json();
    if (!groupData) {
      throw error(500, 'No group data returned from bridge');
    }
    const allGroups = Object.keys(groupData).map((key): GroupRow => {
      return { id: key, ...groupData[key] };
    });

    // break up groups
    const groups: Groups = {
      all: allGroups,
      rooms: allGroups?.filter((group) => group?.type === GroupType.room),
      zones: allGroups?.filter((group) => group?.type === GroupType.zone),
      luminaires: allGroups?.filter((group) => group?.type === GroupType.luminaire),
      lightGroups: allGroups?.filter((group) => group?.type === GroupType.lightGroup),
      lightSources: allGroups?.filter((group) => group?.type === GroupType.lightSource),
      entertainment: allGroups?.filter((group) => group?.type === GroupType.entertainment),
    };
    return { lights, groups };
  } catch (err) {
    return { error: 'Failed to load lights' };
  }
}) satisfies PageLoad;
