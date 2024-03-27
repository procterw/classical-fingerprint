import { sort } from "d3-array";
import { Work } from "../services/getMusicData";
import { useMusicData } from "./useMusicData";
import { useUserRatings } from "./useUserRatings";
import { useWorkQueue } from "./useWorkQueue";

export interface RatedWork extends Work {
  rating: number,
}

export const useGetRatedWorks = () => {
  const { works } = useMusicData();
  const { userRatings } = useUserRatings();

  const ratedWorks: Array<RatedWork> = [];

  works.forEach((w) => {
    if (!Object.keys(userRatings).includes(w.id)) {
      return;
    }

    ratedWorks.push({
      ...w,
      rating: userRatings[w.id],
    });
  });

  return sort(ratedWorks, d => d.composer.name, d => d.title);
};

// TODO I'm not fond of this sort method
export const useGetWorkQueue = () => {
  const { works } = useMusicData();
  const { workQueue } = useWorkQueue();

  const filledWorkQueue: Array<Work> = [];

  workQueue.forEach((id) => {
    const w = works.find((w) => w.id === id);
    if (w) filledWorkQueue.push(w);
  });

  return filledWorkQueue;
};
