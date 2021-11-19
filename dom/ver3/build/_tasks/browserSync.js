import PATH from "../_setting/config.js";
import browserSync from "browser-sync";
export function browsersync(cb) {
  browserSync.init({
    port: 3000,
    server: {
      baseDir: "../../../../dist/",
      index: "index.html",
    },
    startPath: "/engine/ui/34_barbaBase_ver2/",
  });

  cb();
}

export function reload(cb) {
  browserSync.reload();
  cb();
}
