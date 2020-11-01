**Eloqua** is a free, open-source app, which offers, in both audio and text formats, great English speeches in history from 30+ public figures, including politicians, entrepreneurs, authors, celebrities, etc., covering a wide range of topics and themes.

**React Native** is a port of the original [Eloqua speech listener PWA(Progressive Web App)](https://github.com/ilovepku/pwa-quanto) to native Android and iOS(planned) versions.

# Features
- Stream and play audio of selected speech from a wide and ever-expanding repertoire
- Scroll through the full transcript of a speech
- Filter through speeches with either speaker, category, or keyword search
- Add chosen speeches to playlist
- Mark favourite speeches
- Control the player from notification and lock screen
- Jump around easily with fast forward/rewind or the slider
- Cache streamed audio for offline play (Android only)

# Planned (major) features
- Playback speed controlling
- Background information on speeches
- Highlighting of transcript synced with playing progress
- Repeatable segment, automatic segmentation

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

# Contributing

# Known bugs

# License

MIT License

Copyright (c) 2020 Sean Lee

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
