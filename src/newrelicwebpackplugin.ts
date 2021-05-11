// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
  // ...

import { Compilation, Compiler, Stats, StatsAsset } from 'webpack';
import * as fs from 'fs'

export interface Options {
  verbose: boolean
}

const isJavascript = function (asset: any) {
  if(!asset['existsAt']) { return false }
  if(!asset.existsAt.split) { return false }
  const parts = asset.existsAt.split('.')
  const extension = parts.pop()
  return extension === 'js'
}

const pluginName = 'cerwym-newrelic-webpack-plugin';

class NewrelicWebpackPlugin {
  private readonly verbose: boolean;

  private assetsToPrepend: string[] = []

  constructor(options: Options = {verbose: true}) {
    this.log('Loaded');

    this.verbose = options.verbose;

    this.apply = this.apply.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }

  apply(compiler: Compiler) {
    const hooks = compiler.hooks;

    hooks.done.tap(pluginName, stats => {
      this.handleDone(stats);
    });

    this.log('Applying hooks');

    // compiler.hooks.done.tap(pluginName, appendNewrelicToJsAssets);
  }

  handleDone(stats: Stats) {
    this.log('Running after compile hook', stats);

    if (!stats.compilation.assets) {
      console.log('No Compilation Assets exist')
    }
      // let's shorten that up
      const assets = stats.compilation.assets

      // get a list of all the possibly emitted asset files
      const keys = Object.keys(stats.compilation.assets)
      for (const key of keys) {
        let asset = assets[key]
        // if the asset hasn't been emitted or is not a
        // javascript fie, then vail
        if(!asset) { continue }
        if(!isJavascript(asset)) { continue }

        // put the agent at the top of the compiled file
        const newSource = "require('newrelic');" + asset.source()
        // @ts-ignore
        fs.writeFile(asset.existsAt, newSource, function(err){
          if(err) throw err;
          // let the world know!
          // TODO: is there a webpack output function this
          //       should be going through
          // @ts-ignore
          console.log("\nAdded newrelic to " +  asset.existsAt + "\n")
        })
      }
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
