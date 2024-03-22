import { selectedComposers } from "./selectedComposers";
import { getWorkPreview } from "./workPreviews";

export interface Work {
  genre: string,
  id: string,
  popular: "0" | "1",
  recommended: "0" | "1",
  subtitle: string,
  title: string,
  preview: WorkPreview,
  composer: Composer,
};

export interface WorkPreview {
  title: string,
  video_id: string,
  preview_start_s: number,
};

export interface Composer {
  id: string,
  name: string,
  complete_name: string,
  birth: string,
  death: string | null, // null indicates still alive
  epoch: string,
  portrait: string, // URL?
}

export const getMusicData = async (onLoad: Function) => {
  let allWorks: Array<Work> = [];

  const composerWorksRequests = selectedComposers.map((c: Composer) => {
    return fetch(`https://api.openopus.org/work/list/composer/${c.id}/genre/Recommended.json`)
      .then((r) => r.json())
      .then((d) => {
        const works = d.works
          .filter((w: Work) => w.popular === "1")
          .map((w: Work) => getWorkPreview(w))

        allWorks = [
          ...allWorks,
          ...works.map((w: Work) => {
            return {
              ...w,
              composer: c,
            }
          }),
        ];

        return { ...c, works };
      })
  });

  const allComposers = await Promise.all(composerWorksRequests);

  onLoad({
    works: allWorks,
    composers: allComposers,
  })
}
