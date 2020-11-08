import React, { useEffect } from 'react';
import { getLotrProfiles } from '../services/dataService';

export const ProfileContext = React.createContext({
  profiles: [],
});

function ProfilesReducer(state, action) {
  let profiles;

  switch (action.type) {
    case 'ascending':
      profiles = [...state.profiles];
      profiles.sort((profileA, profileB) => (profileA.name > profileB.name ? 1 : -1));
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

function ProfilesContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(ProfilesReducer, {
    profiles: [],
  });

  useEffect(async () => {
    const profiles = await getLotrProfiles();
    dispatch({ type: 'setUsers', payload: profiles });
  }, []);

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>{children}</ProfileContext.Provider>
  );
}

export default ProfilesContextProvider;
