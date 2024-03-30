import { createContext, useContext, useEffect, useState } from "react";

type Rating = 1 | 2 | 3 | 4;

type UserRatingsContextType = {
  userRatings: { [key: string]: Rating },
  updateUserRatings: Function,
};

const UserRatingsContext = createContext<UserRatingsContextType>({
  userRatings: {},
  updateUserRatings: () => {},
});

export const UserRatingsProvider = (props: { children: React.ReactNode }) => {
  // Work id -> number rating from 1 - 3
  const [userRatings, setUserRatings] = useState<{ [key: string]: Rating }>({});

  const updateUserRatings = (workId: string, rating: Rating) => {
    let nextRatings = { ...userRatings };

    if (nextRatings[workId] === rating) {
      delete nextRatings[workId];
    } else {
      nextRatings[workId] = rating;
    }

    setUserRatings(nextRatings);

    try {
      localStorage.setItem('classicalFingerprintRatings', JSON.stringify(nextRatings));
    } catch (e) {
      console.error("Unable to write user ratings: ");
      console.error(e);
    }
  };

  useEffect(() => {
    try {
      const item = localStorage.getItem('classicalFingerprintRatings');
      if (item) {
        setUserRatings(JSON.parse(item));
      }
    } catch (e) {
      console.error("Unable to get user ratings: ");
      console.error(e);
    }
  }, []);

  const state = {
    userRatings,
    updateUserRatings,
  };

  return (
    <UserRatingsContext.Provider value={state}>
      { props.children }
    </UserRatingsContext.Provider>
  );
};

export const useUserRatings = () => {
  return useContext(UserRatingsContext);
};
