[![Sponsor on GitHub](https://img.shields.io/badge/Sponsor-on%20GitHub-blueviolet)](https://github.com/sponsors/ilovepku) [![Donate via PayPal](https://img.shields.io/badge/Donate-via%20PayPal-%230d3685)](https://www.paypal.com/donate?hosted_button_id=EMK52WJM37KWY)

* * *

**Eloqua** is a free, open-source app, which offers, in both audio and text formats, great English speeches in history from 30+ public figures, including politicians, entrepreneurs, authors, celebrities, etc., covering a wide range of topics and themes.

**React Native** is a port of the original [Eloqua speech listener PWA(Progressive Web App)](https://github.com/ilovepku/pwa-quanto) to native Android and iOS(planned) versions.

[![React Native](https://img.shields.io/github/package-json/dependency-version/ilovepku/EloquaNative/react-native?color=%2361dafb)](https://github.com/react-native-community/releases/blob/master/CHANGELOG.md) [![Track Player](https://img.shields.io/github/package-json/dependency-version/ilovepku/EloquaNative/react-native-track-player?color=%23227efa)](https://github.com/react-native-kit/react-native-track-player/releases) [![React Navigation](https://img.shields.io/github/package-json/dependency-version/ilovepku/EloquaNative/@react-navigation/native?color=%236b52ae)](https://github.com/react-navigation/react-navigation/blob/main/packages/native/CHANGELOG.md) [![Redux Toolkit](https://img.shields.io/github/package-json/dependency-version/ilovepku/EloquaNative/@reduxjs/toolkit?color=%23593d88)](https://github.com/reduxjs/redux-toolkit/releases) [![Apollo](https://img.shields.io/github/package-json/dependency-version/ilovepku/EloquaNative/@apollo/client?color=%23D64292)](https://github.com/apollographql/apollo-client/blob/main/CHANGELOG.md) [![Tailwind CSS](https://img.shields.io/github/package-json/dependency-version/ilovepku/EloquaNative/tailwind-rn?color=%2338b2ac)](https://github.com/vadimdemedes/tailwind-rn/releases)

- **Supported Android versions**: 5.0+

# Features
- Stream and play audio of selected speech from a wide and ever-expanding repertoire
- Scroll through the full transcript of a speech
- Filter through speeches with either speaker, category, or keyword search
- Add chosen speeches to playlist
- Mark favourite speeches
- Control the player from notification and lock screen
- Jump around easily with fast forward/rewind or the slider
- Cache streamed audio for offline play (Android only now)

# Planned features
- Playback speed controlling
- Background information on speeches
- Highlighting of transcript synced with playing progress (major)
- Repeatable segment, automatic segmentation (major)

# Building the applications

## Required dependencies

- Install node 10+ - https://nodejs.org/en/

## Building

Before doing anything else, from the root of the project, run:

	npm install
  
## Testing the application

First you need to setup React Native to build projects with native code. For this, follow the instructions on the [Get Started](https://facebook.github.io/react-native/docs/getting-started.html) tutorial, in the "React Native CLI Quickstart" tab.

Then:

	npm run android
  
Normally the bundler should start automatically with the application. If it doesn't, run `npm start`.

# Donations

Developing quality applications takes time, but there are also expenses, such as app store fees, hosting, digital certificates, etc. Your donation will make it possible to keep up the current development standards and bring about new features.

## PayPal

To donate via PayPal, please follow this link:

[![Donate via PayPal](https://img.shields.io/badge/Donate-via%20PayPal-%230d3685)](https://www.paypal.com/donate?hosted_button_id=EMK52WJM37KWY)

## GitHub Sponsor

Or follow this link to become a GitHub Sponsor:

[![Sponsor on GitHub](https://img.shields.io/badge/Sponsor-on%20GitHub-blueviolet)](https://github.com/sponsors/ilovepku)

# Contributing

# Known bugs

# License

MIT License

Copyright (c) 2020 Sean Lee

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
