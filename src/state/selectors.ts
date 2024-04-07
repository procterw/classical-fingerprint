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
  const { activeWork } = useWorkQueue();

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
  
  const sortedRatedWorks = sort(ratedWorks, d => (d.rating * -1), d => d.composer.name, d => d.title);

  const activeRating = ratedWorks.find((w) => w.id === activeWork?.id);

  if (activeRating) return sortedRatedWorks;
  if (!activeWork) return sortedRatedWorks;
  
  return [{ ...activeWork, rating: 99 }, ...sortedRatedWorks];
};
