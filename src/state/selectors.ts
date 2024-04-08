import { sort } from "d3-array";
import { useMusicData } from "./useMusicData";
import { useUserRatings } from "./useUserRatings";
import { useWorkQueue } from "./useWorkQueue";

export const useGetRatedWorks = (): Array<RatedWork> => {
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
  
  return [
    { ...activeWork, rating: 99 },
    ...sortedRatedWorks,
  ];
};
