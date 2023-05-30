#!/bin/bash

nano package.json
npm run build && npm publish
cd ../delegates/dom
npm update backend-dom-components
cd -
