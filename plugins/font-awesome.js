import { config, library } from "@fortawesome/fontawesome-svg-core";
import {
  faMailbox,
  faHouse,
  faFolder,
  faGear,
  faDisplay,
  faTrash,
  faCalendarCirclePlus,
  faEnvelope,
  faCalendarCheck,
  faCalendarCircleUser,
  faDownload,
  faCopy,
  faLightbulb,
  faExpand,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Prevent auto CSS injection since we import the CSS in nuxt.config.ts
config.autoAddCss = false;

// Add all icons to the library
const icons = [
  faMailbox,
  faHouse,
  faFolder,
  faGear,
  faDisplay,
  faTrash,
  faCalendarCirclePlus,
  faEnvelope,
  faCalendarCheck,
  faCalendarCircleUser,
  faDownload,
  faCopy,
  faLightbulb,
  faExpand,
];

// Register icons with the library
for (const icon of icons) {
  library.add(icon);
}

// Export the plugin
export default defineNuxtPlugin((nuxtApp) => {
  // Register the FontAwesomeIcon component globally
  if (!nuxtApp.vueApp._context.components["FontAwesomeIcon"]) {
    nuxtApp.vueApp.component("FontAwesomeIcon", FontAwesomeIcon);
  }
});
