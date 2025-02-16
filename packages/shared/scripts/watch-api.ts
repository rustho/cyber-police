import chokidar from "chokidar";
import { exec } from "child_process";

const watcher = chokidar.watch("../backend/src/**/*.ts", {
  ignored: /(^|[\/\\])\../,
  persistent: true,
});

watcher.on("change", (path) => {
  console.log(`File ${path} has been changed`);
  exec("pnpm generate-types", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
    console.log(`Types regenerated: ${stdout}`);
  });
});
