
export type ImageType = "all" | "portrait" | "full-body" | "artistic";

export interface GalleryImage {
  url: string;
  type: ImageType;
  alt: string;
}
