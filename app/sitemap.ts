import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/pension-chat-nantes", "/extras", "/a-propos", "/reservation"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" || path === "/pension-chat-nantes" ? 1 : 0.7,
  }));
}
