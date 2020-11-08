const apiKey = 'TRqUueyVk9Ro1afAB2eR';
const api = 'https://the-one-api.dev/v2/character?limit=20&page=4&realm';

const auth = { Authorization: `Bearer ${apiKey}` };

const randomInt = () => Math.floor(Math.random() * 10 + 1);

export const getLotrProfiles = async () => {
  // using vanilla fetch here,
  // as opposed to axios, etc.
  // public api chosen does not return picture data.
  // mocking up picture here using existing data
  return await fetch(api, { headers: { ...auth } })
    .then((response) => response.json())
    .then((body) =>
      body.docs.map((profile) => ({
        ...profile,
        photoUrl: `https://placeimg.com/200/200/people?id=${randomInt()}`,
      }))
    );
};
