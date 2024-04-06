import { Work } from './getMusicData';
import { workSummaries } from './work_summaries';

export const getWorkSummary = (w: Work): Work => {
  const s = workSummaries[w.id];

  const dateMatches = [...s.summary.matchAll(/(1\d\d\d|20\d\d)/g)];

  console.log(dateMatches.map(d => Number(d[0])));

  if (!s) {
    return {
      ...w,
      summary: "",
      wiki_url: "",
      wiki_dates: [],
    };
  }

  return { ...w, ...s, wiki_dates: dateMatches.map(d => Number(d[0])) };
}
