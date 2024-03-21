import { createContext, useContext, useEffect, useState } from "react";
import { Work } from "../services/getMusicData";
import { useUserRatings } from "./useUserRatings";
import { useMusicData } from "./useMusicData";

type WorkQueueContextType = {
  activeWork: Work | null,
  previousWorks: Array<Work>,
  nextWorks: Array<Work>,
  getNextWork: Function,
  getPreviousWork: Function,
};

const WorkQueueContext = createContext<WorkQueueContextType>({
  activeWork: null,
  previousWorks: [],
  nextWorks: [],
  getNextWork: () => {},
  getPreviousWork: () => {},
});

export const WorkQueueProvider = (props: { children: React.ReactNode }) => {
  // Work that is currently displayed on the page
  const [activeWork, setActiveWork] = useState<Work | null>(null);

  // Previous and next works are used for a 'undo/redo' system
  // for navigating through past work
  const [previousWorks, setPreviousWorks] = useState<Array<Work>>([]);
  const [nextWorks, setNextWorks] = useState<Array<Work>>([]);

  const musicData = useMusicData();
  const { userRatings } = useUserRatings();

  // Get initial active work after load
  useEffect(() => {
    if (musicData.completed) {
      getNextWork();
    }
  }, [musicData.completed]);

  
  const getNextWork = () => {
    if (activeWork) {
      setPreviousWorks([...previousWorks, activeWork]);
    }

    // If the user has previousWorks it means they were backtracking
    // so we want them to be able to return to works they backed away from
    if (nextWorks.length > 0) {
      const nextWorksCopy = [...nextWorks];
      setActiveWork(nextWorksCopy.pop() || null);
      setNextWorks(nextWorksCopy);

      return;
    }

    // What hasn't the user rated yet?
    const filteredWorks = musicData.works.filter((w: Work) => {
      return !Object.keys(userRatings).includes(w.id);
    });

    // Get a random index from the remaining works
    const i = Math.floor(Math.random() * filteredWorks.length);

    const nextWork = filteredWorks[i];
  
    setActiveWork(nextWork);
  };


  const getPreviousWork = () => {
    const previousWorksCopy = [...previousWorks];
    const nextWork = previousWorksCopy.pop();

    if (!nextWork) return;
    if (!activeWork) return;

    setNextWorks([...nextWorks, activeWork]);

    setActiveWork(nextWork);
    setPreviousWorks(previousWorksCopy);
  };


  const state = {
    activeWork,
    previousWorks,
    nextWorks,
    getNextWork,
    getPreviousWork,
  };

  return (
    <WorkQueueContext.Provider value={state}>
      { props.children }
    </WorkQueueContext.Provider>
  );
};

export const useWorkQueue = () => {
  return useContext(WorkQueueContext);
};
