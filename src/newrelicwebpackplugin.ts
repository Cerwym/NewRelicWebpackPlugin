// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
  // ...

import { Compilation, Compiler, Stats } from 'webpack';

export interface Options {
  verbose: boolean
}

class NewrelicWebpackPlugin {
  private readonly verbose: boolean;

  constructor(options: Options = {verbose: true}) {
    this.log('Loaded');

    this.verbose = options.verbose;

    this.apply = this.apply.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }

  apply(compiler: Compiler) {
    const hooks = compiler.hooks;

    hooks.done.tap('boundary-newrelic-webpack-plugin', stats => {
      this.handleDone(stats);
    });

    this.log('Applying hooks');

    // compiler.hooks.done.tap(pluginName, appendNewrelicToJsAssets);
  }

  handleDone(stats: Stats) {
    this.log('Running after compile hook', stats);
  }

  log(message: string, ...optionalParams : any[]) {
    if (this.verbose) {
      console.log(
        `boundary-newrelic-webpack-plugin : ${message}`,
        optionalParams
      );
    }
  }
}

export {NewrelicWebpackPlugin}
