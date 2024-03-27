import { createContext, useContext, useEffect, useState } from "react";
import { Work } from "../services/getMusicData";
import { useUserRatings } from "./useUserRatings";
import { useMusicData } from "./useMusicData";

type WorkQueueContextType = {
  activeWorkIndex: number,
  setActiveWorkIndex: Function,
  setActiveWork: Function,
  activeWork: Work | null,
  workQueue: Array<string>,
  getNextWork: Function,
  getPreviousWork: Function,
};

const WorkQueueContext = createContext<WorkQueueContextType>({
  activeWorkIndex: 0,
  setActiveWorkIndex: () => {},
  setActiveWork: () => {},
  activeWork: null,
  workQueue: [],
  getNextWork: () => {},
  getPreviousWork: () => {},
});

const shuffleArray = (array: Array<any>): Array<any> => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const WorkQueueProvider = (props: { children: React.ReactNode }) => {

  const [activeWorkIndex, setActiveWorkIndex]  = useState<number>(0);
  const [workQueue, setWorkQueue] = useState<Array<string>>([]);

  const musicData = useMusicData();
  const { userRatings } = useUserRatings();

  // Get initial active work after load
  useEffect(() => {
    if (musicData.completed) {
      getNextWork();

      setWorkQueue(
        shuffleArray(
          musicData.works.map((w) => w.id)
            .filter((wid) => !Object.keys(userRatings).includes(wid)),
        ),
      );
    }
  }, [musicData.completed]);
  
  const getNextWork = () => {
    if (activeWorkIndex >= workQueue.length) return;
    setActiveWorkIndex(activeWorkIndex + 1);
  }

  const getPreviousWork = () => {
    if (activeWorkIndex === 0) return;
    setActiveWorkIndex(activeWorkIndex - 1);
  };

  const setActiveWork = (wId: string) => {
    const index = workQueue.findIndex(id => id === wId);
    if (index === undefined) return;
    if (index > -1) {
      setActiveWorkIndex(index);
    }
  };

  const activeWorkId = workQueue[activeWorkIndex];
  const activeWork = musicData.works.find((w) => w.id === activeWorkId) || null;

  const state = {
    activeWorkIndex,
    setActiveWorkIndex,
    setActiveWork,
    activeWork,
    workQueue,
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
