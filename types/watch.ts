export type ComparisonMode = "full" | "side-by-side" | "slide";

export interface WatchShortcuts {
  onCopyShortcut(handler: () => void): () => void;
}

declare module "#app" {
  interface NuxtApp {
    $watchShortcuts?: WatchShortcuts;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $watchShortcuts?: WatchShortcuts;
  }
}
