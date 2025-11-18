import { ref, watch, type Ref } from "vue";
import type { ComparisonMode } from "~/types/watch";

export function useComparisonMode(hasSecondaryVideo: Ref<boolean>) {
  const comparisonMode = ref<ComparisonMode>("side-by-side");

  watch(
    hasSecondaryVideo,
    (hasSecondary) => {
      if (!hasSecondary && comparisonMode.value !== "side-by-side") {
        comparisonMode.value = "side-by-side";
      }
    },
    { immediate: true }
  );

  return {
    comparisonMode,
  };
}
