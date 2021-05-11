# NewRelicWebpack Plugin

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.com/Cerwym/NewRelicWebpackPlugin.svg?branch=main)](https://travis-ci.com/Cerwym/NewRelicWebpackPlugin)

Makes sure newrelic is added to any emitted js files built under webpack

# Installation

`npm i @cerwym/newrelic-webpack-plugin`

# Usage

```
const { NewrelicWebpackPlugin } = require('@cerwym/newrelic-webpack-plugin');

module.exports = {
  plugins: [ new NewrelicWebpackPlugin({verbose: false})],
};
```
