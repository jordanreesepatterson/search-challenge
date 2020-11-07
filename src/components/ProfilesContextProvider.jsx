import React, { useEffect, useState } from 'react';
// import mockProfiles from '../profiles.json';

export const ProfileContext = React.createContext({
  profiles: [],
});

const apiKey = 'TRqUueyVk9Ro1afAB2eR';
const api = 'https://the-one-api.dev/v2/character?limit=20';

function ProfilesReducer(state, action) {
  let profiles;

  switch (action.type) {
    case 'ascending':
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => profileA.name.localeCompare(profileB.name));
      return { profiles };

    case 'descending':
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.name < profileB.name ? 1 : -1));
      return { profiles };

    case 'setUsers':
      const { payload } = action;
      return { profiles: payload };

    default:
      throw new Error();
  }
}

const fetchUsers = async () => {
  return await fetch(api, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((response) => response.json())
    .then((body) => body.docs);
};

function ProfilesContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = React.useReducer(ProfilesReducer, {
    profiles: [],
  });

  useEffect(async () => {
    setLoading(true);
    const userProfiles = await fetchUsers();
    dispatch({ type: 'setUsers', payload: userProfiles });
    setLoading(false);
  }, []);

  console.log({ loading });

  return (
    <ProfileContext.Provider value={{ ...state, loading, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfilesContextProvider;
