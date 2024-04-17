import { createContext, useContext, useEffect, useState } from "react";
import { useUserRatings } from "./useUserRatings";
import { useMusicData } from "./useMusicData";

export type Filter = { key: string, value: string } | null;
type WorkQueueContextType = {
  activeWork: Work | null,
  setActiveWork: Function,
  getNextWork: Function,
  getPreviousWork: Function,

  playMode: PlayMode,
  setPlayMode: Function,

  disablePrevious: boolean,

  filter: Filter,
  setFilter: Function,
};

const WorkQueueContext = createContext<WorkQueueContextType>({
  activeWork: null,
  setActiveWork: () => {},
  getNextWork: () => {},
  getPreviousWork: () => {},

  playMode: 'discovery',
  setPlayMode: () => {},

  disablePrevious: false,

  filter: null,
  setFilter: () => {},
});

export const WorkQueueProvider = (props: { children: React.ReactNode }) => {
  const [activeWork, setActiveWork] = useState<Work | null>(null);

  const [alreadyPlayed, setAlreadyPlayed] = useState<Array<Work | null>>([]);

  const [filter, _setFilter] = useState<Filter>(null);
  const musicData = useMusicData();
  const { userRatings } = useUserRatings();

  const [playMode, setPlayMode] = useState<PlayMode>('discovery');

  const setFilter = (f: Filter) => {
    if (!f) {
      _setFilter(null);
      return;
    }
    _setFilter(f);

    // If the filter is a work, don't add a filter but play the work instead
    if (f.key === "Works") {
      const [title, composer] = f.value.split('__SPLIT__');
      const nextWork = musicData.works.find(w => w.title === title && w.composer.complete_name === composer);
      if (nextWork) getNextWork(nextWork);
      return;
    } else {
      setTimeout(() => getNextWork(undefined, f), 0);
    }
  };

  // Get initial active work after load
  useEffect(() => {
    getNextWork();
  }, []);

  const listAvailableNextWorks = (f: Filter = filter) => {
    // Get all works
    const filteredWorks = musicData.works
      .filter((w) => w.id !== activeWork?.id)
    // Remove filter non-matches
      .filter((w) => {
        if (f === null) return true;
        if (f.key === 'Works') return true;
        if (f.key === 'Epochs') return w.composer.epoch === f.value;
        if (f.key === 'Genres') return w.genre === f.value;
        if (f.key === 'Composers') return w.composer.complete_name === f.value;
        return w;
      })
      // Remove already rated if there is no filter
      .filter((w) => {
        if (filter) return true;
        return !Object.keys(userRatings).includes(w.id);
       });
    return filteredWorks;
  }
  
  const getNextWork = (work?: Work, f?: Filter) => {
    if (activeWork) {
      setAlreadyPlayed([...alreadyPlayed, activeWork]);
    }

    if (work) {
      setActiveWork(work);
      return;
    }

    const availableWorks = listAvailableNextWorks(f);

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

  const state = {
    activeWork,
    setActiveWork,
    getNextWork,
    getPreviousWork,

    playMode,
    setPlayMode,

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
