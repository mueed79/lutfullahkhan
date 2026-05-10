export type MediaType = "audio" | "video" | "document" | "photograph";

export interface WorkItem {
  id: string;
  title: string;
  date: string;
  description: string;
  mediaType: MediaType;
  src: string;
  poster?: string;
  metadata?: Record<string, string>;
}

export interface Collection {
  slug: string;
  title: string;
  description: string;
  items: WorkItem[];
}

export const collectionsData: Record<string, Collection> = {
  "classical-music": {
    slug: "classical-music",
    title: "Classical Music Archive",
    description: "A comprehensive collection of classical vocal and instrumental recordings, curated by Lutfullah Khan over five decades.",
    items: [
      {
        id: "m1",
        title: "Raag Bhairav - Vocal Solo",
        date: "1964",
        description: "A rare early morning recording capturing the pristine essence of Raag Bhairav.",
        mediaType: "audio",
        src: "/audio/bhairav.mp3",
        metadata: { "Artist": "Unknown Master", "Location": "Karachi", "Duration": "45:00" }
      },
      {
        id: "m2",
        title: "Sitar Recital - Raag Yaman",
        date: "1972",
        description: "An evening recital featuring intricate taans and a soulful alap.",
        mediaType: "audio",
        src: "/audio/yaman.mp3",
        metadata: { "Instrument": "Sitar", "Artist": "Ustad X", "Duration": "32:15" }
      }
    ]
  },
  "historical-interviews": {
    slug: "historical-interviews",
    title: "Historical Interviews",
    description: "Oral history recordings with key figures of the partition era and post-independence Pakistan.",
    items: [
      {
        id: "v1",
        title: "Reflections on 1947",
        date: "1985",
        description: "A deep-dive interview discussing the cultural shifts during the partition.",
        mediaType: "video",
        src: "/video/reflections.mp4",
        poster: "/video/reflections-thumb.jpg",
        metadata: { "Interviewer": "Lutfullah Khan", "Subject": "Scholar Y" }
      }
    ]
  }
};
