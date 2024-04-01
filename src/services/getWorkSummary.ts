import { Work } from './getMusicData';
import { workSummaries } from './work_summaries';

export const getWorkSummary = (w: Work): Work => {
  const s = workSummaries[w.id];

  if (!s) {
    return {
      ...w,
      summary: "",
      wiki_url: "",
    }
  }

  return { ...w, ...s };
}
