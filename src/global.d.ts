
/* *** *** *** ***
    WORKS 
*** *** *** *** */

declare interface Work {
  genre: string,
  id: string,
  subtitle: string,
  title: string,
  composer: Composer,
  summary: string,
  wiki_url: string,
  date: number,
  yt_id: string,
  yt_start: number,
};

declare interface RatedWork extends Work {
  rating: number,
  composer: Composer,
}

declare interface WorkMetadataManual {
  title: string, // Redundant field for manual QA
  video_id: string,
  preview_start_s: number,
  summary?: string,
  wiki_url?: string,
};

declare interface WorkMetadataScraped {
  summary?: string,
  wiki_url?: string,
};

declare interface Composer {
  id: string,
  name: string,
  complete_name: string,
  birth: string,
  death: string | null, // null indicates still alive
  epoch: string,
  portrait: string, // URL?
  biography: string,
  wiki_url: string,
};

declare interface ComposerMetadataScraped {
  complete_name: string,
  bio_preview: string,
  biography: string,
  wiki_url: string,
};

declare interface ComposerMetadataManual {
  complete_name: string,
  biography: string,
};

declare type PlayMode = 'discovery' | 'radio';
