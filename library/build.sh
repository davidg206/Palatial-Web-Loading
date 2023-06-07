#!/bin/bash

nano package.json
npm run build && npm publish
cd ..
npm update backend-dom-components-1
cd -
