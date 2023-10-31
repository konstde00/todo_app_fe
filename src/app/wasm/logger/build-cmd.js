exports.cmd =
  'docker run --rm -v $(pwd):/src emscripten/emsdk emcc -Os src/app/wasm/logger/logger.c -o src/assets/wasm/logger.js -s MODULARIZE=1 -s EXPORT_NAME="ConsoleLoggerModule"';
