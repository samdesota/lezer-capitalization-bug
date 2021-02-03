const lezerGen = require("lezer-generator");
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const stringify = (obj) => JSON.stringify(obj, null, 2);

const assertEqual = (a, b) => {
  console.log(`result: ${a}`);
  assert(a === b);
};

const goodParser = lezerGen
  .buildParser(
    fs.readFileSync(path.join(__dirname, "./good-parse.grammar"), "utf-8")
  )
  .configure({ strict: true });

const goodResult = goodParser.parse("div[disabled]");

assertEqual(
  stringify(goodResult),
  `{
  "type": {
    "name": "Atom",
    "props": {},
    "id": 1,
    "flags": 1
  },
  "children": [
    {
      "type": {
        "name": "Element",
        "props": {},
        "id": 3,
        "flags": 0
      },
      "children": [],
      "positions": [],
      "length": 13
    }
  ],
  "positions": [
    0
  ],
  "length": 13
}`
);

const badParser = lezerGen
  .buildParser(
    fs.readFileSync(path.join(__dirname, "./bad-parse.grammar"), "utf-8")
  )
  .configure({ strict: true });

const result = badParser.parse("div[disabled]");

assertEqual(
  stringify(result),
  `{
  "type": {
    "name": "Atom",
    "props": {},
    "id": 1,
    "flags": 1
  },
  "children": [
    {
      "buffer": {
        "0": 3,
        "1": 0,
        "2": 13,
        "3": 8,
        "4": 4,
        "5": 4,
        "6": 12,
        "7": 8
      },
      "length": 13,
      "set": {
        "types": [
          {
            "name": "⚠",
            "props": {},
            "id": 0,
            "flags": 6
          },
          {
            "name": "Atom",
            "props": {},
            "id": 1,
            "flags": 1
          },
          {
            "name": "Text",
            "props": {},
            "id": 2,
            "flags": 0
          },
          {
            "name": "Element",
            "props": {},
            "id": 3,
            "flags": 0
          },
          {
            "name": "ElementAttribute",
            "props": {},
            "id": 4,
            "flags": 0
          }
        ]
      },
      "type": {
        "name": "",
        "props": {},
        "id": 0,
        "flags": 8
      }
    }
  ],
  "positions": [
    0
  ],
  "length": 13
}`
);
