import { selectedComposers } from "./selectedComposers";
import { getWorkPreview } from "../data/workMetadataManual";
import { getWorkSummary } from './getWorkSummary';

import composers from '../data/composerData.json';
import works from '../data/workData.json';

export const getMusicData = (): { composers: Array<Composer>, works: Array<Work> } => {
  return {
    composers,
    works,
  };
};
