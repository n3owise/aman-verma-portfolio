import createImageUrlBuilder from "@sanity/image-url";
import { projectId, dataset } from "./client";

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: any) => {
  return builder.image(source);
};
