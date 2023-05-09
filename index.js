#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require("glob")
const getCityBorders = require("./util/xml2geojson")

const directoryPath = process.argv[2];

const xml2geojson = (directoryPath) => {

  const files = glob.sync(`${directoryPath}/*.xml`)

  if (files.length === 0) {
    console.log(`No XML files found in ${directoryPath}`);
    return
  }

  const geojson = {
    type: "FeatureCollection",
    features: []
  }

  for (let i = 0; i < files.length; i++) {

    const file = files[i];

    console.log(`Processing ${file} ${i + 1}/${files.length}`);

    const xmlString = fs.readFileSync(file, 'utf8');
    const features = getCityBorders(xmlString);
    geojson.features = geojson.features.concat(features)
  }

  const name = path.basename(files[0]).split('-')[0];
  const targetPath = `./docs/${name}CityBorders.geojson`;

  fs.writeFileSync(targetPath, JSON.stringify(geojson));

  console.log(`Done!`);
}

xml2geojson(directoryPath);