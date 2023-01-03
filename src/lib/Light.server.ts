import { BRIDGE_IP, BRIDGE_USERNAME } from '$env/static/private';

export const toggleLight = async (id: string, on: boolean) => {
  try {
    const headers = new Headers();
    headers.set('hue-application-key', BRIDGE_USERNAME);

    const options = {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        on: { on }
      })
    };

    const res = await fetch(`https://${BRIDGE_IP}/clip/v2/resource/light/${id}`, options);
    console.log(res);

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};
