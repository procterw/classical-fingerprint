import { workSummaries } from '../data/scrapedWorkSummaries';

export const getWorkSummary = (w: Work): Work => {
  const s = workSummaries[w.id];

  const dateMatches = [...s.summary.matchAll(/(1\d\d\d|20\d\d)/g)];

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
