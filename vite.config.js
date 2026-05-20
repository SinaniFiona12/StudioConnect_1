import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        map: resolve(__dirname, "map.html"),
        overview: resolve(__dirname, "overview.html"),
        information: resolve(__dirname, "information.html"),
        eventCode: resolve(__dirname, "eventCode.html"),
        eventOverview: resolve(__dirname, "event-overview.html"),
        eventDatum: resolve(__dirname, "EventDatum.html"),
        eventRegistration: resolve(__dirname, "Eventregistration.html"),
        confirmation: resolve(__dirname, "confirmation.html"),
      },
    },
  },
});