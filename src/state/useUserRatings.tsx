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

  // Work id -> number rating from 0 - 4
  const [userRatings, setUserRatings] = useState<{ [key: string]: Rating }>({});

  const updateUserRatings = (workId: string, rating: Rating) => {
    setUserRatings({
      ...userRatings,
      [workId]: rating,
    });
  };

  useEffect(() => {
    // TODO get ratings from local storage
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
