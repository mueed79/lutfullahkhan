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
  count?: string;
  coverImage?: string;
  items: WorkItem[];
}

export interface Story {
  name: string;
  slug: string | null;
}

export const stories: Story[] = [
  { name: "Faiz Ahmed Faiz", slug: "faiz" },
  { name: "Josh Malihabadi", slug: null },
  { name: "Fahmida Riaz", slug: null },
  { name: "Hafeez Jalandhari", slug: null },
  { name: "Atiya Begum Fyzee", slug: null },
  { name: "Begum Ra'ana Liaquat Ali Khan", slug: null },
  { name: "Roshan Ara Begum", slug: null },
  { name: "Akhtar ul-Iman", slug: null },
];

export const collectionsData: Record<string, Collection> = {
  "classical-music": {
    slug: "classical-music",
    title: "Classical Music",
    count: "450+ Recordings",
    coverImage: "/collections/music.jpg",
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
  "literary-discussions": {
    slug: "literary-discussions",
    title: "Literary Discussions",
    count: "120+ Sessions",
    coverImage: "/collections/literature.jpg",
    description: "Conversations with legendary Urdu poets and writers, including Faiz Ahmad Faiz.",
    items: []
  },
  "historical-interviews": {
    slug: "historical-interviews",
    title: "Historical Interviews",
    count: "85 Interviews",
    coverImage: "/collections/interviews.jpg",
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
  },
  "photographic-archive": {
    slug: "photographic-archive",
    title: "Photographs",
    count: "2,000+ Items",
    coverImage: "/collections/photos.jpg",
    description: "A visual record of cultural life in Lahore and Karachi over five decades.",
    items: []
  },
  "manuscripts": {
    slug: "manuscripts",
    title: "Manuscripts",
    count: "300+ Documents",
    coverImage: "/collections/manuscripts.jpg",
    description: "Handwritten notes, letters, and rare first editions from the archive.",
    items: []
  }
};

export const collections = Object.values(collectionsData);
