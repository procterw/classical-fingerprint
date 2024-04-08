import { createContext, useContext, useEffect, useState } from "react";
import { useUserRatings } from "./useUserRatings";
import { useMusicData } from "./useMusicData";

export type Filter = { key: string, value: string };
const defaultFilter = { key: '_any', value: 'Anything' };

type WorkQueueContextType = {
  activeWork: Work | null,
  setActiveWork: Function,
  getNextWork: Function,
  getPreviousWork: Function,

  disablePrevious: boolean,

  filter: Filter,
  setFilter: Function,
};

const WorkQueueContext = createContext<WorkQueueContextType>({
  activeWork: null,
  setActiveWork: () => {},
  getNextWork: () => {},
  getPreviousWork: () => {},

  disablePrevious: false,

  filter: defaultFilter,
  setFilter: () => {},
});

export const WorkQueueProvider = (props: { children: React.ReactNode }) => {
  const [activeWork, setActiveWork] = useState<Work | null>(null);

  const [alreadyPlayed, setAlreadyPlayed] = useState<Array<Work | null>>([]);

  const [filter, _setFilter] = useState<Filter>(defaultFilter);
  const setFilter = (f: Filter) => f === null ? _setFilter(defaultFilter) : _setFilter(f);

  const musicData = useMusicData();
  const { userRatings } = useUserRatings();

  // Get initial active work after load
  useEffect(() => {
    getNextWork();
  }, []);

  const listAvailableNextWorks = () => {
    // Get all works
    const filteredWorks = musicData.works
      .filter((w) => w.id !== activeWork?.id)
    // Remove filter non-matches
      .filter((w) => {
        if (filter.key === '_any') return w;
        if (filter.key === 'epochs') return w.composer.epoch === filter.value;
        if (filter.key === 'genres') return w.genre === filter.value;
        if (filter.key === 'composers') return w.composer.name === filter.value;
        return w;
      })
      // Remove already rated
      .filter((w) => !Object.keys(userRatings).includes(w.id));
    return filteredWorks;
  }
  
  const getNextWork = () => {
    const availableWorks = listAvailableNextWorks();

    if (activeWork) {
      setAlreadyPlayed([...alreadyPlayed, activeWork]);
    }

    if (!availableWorks.length) return;

    const randomIndex = Math.floor(Math.random() * (availableWorks.length - 1));
    setActiveWork(availableWorks[randomIndex]);
  }

  const getPreviousWork = () => {
    if (alreadyPlayed.length < 1) return;

    const alreadyPlayedCopy = [...alreadyPlayed];
    const nextWork = alreadyPlayedCopy.pop();
    if (nextWork) {
      setActiveWork(nextWork);
      setAlreadyPlayed(alreadyPlayedCopy);
    }
  };

  console.log(alreadyPlayed);

  const state = {
    activeWork,
    setActiveWork,
    getNextWork,
    getPreviousWork,

    disablePrevious: alreadyPlayed.length < 1,
    disableNext: listAvailableNextWorks().length === 0,

    filter,
    setFilter,
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
