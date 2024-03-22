import { Work } from "../services/getMusicData";
import { useMusicData } from "./useMusicData";
import { useUserRatings } from "./useUserRatings";

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

  return ratedWorks;
};
