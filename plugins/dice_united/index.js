import _ from "lodash";
import {SEASON_IDS} from "./constants.js";

const MID = "S01A-1DF2-D692-X1E4";
const MAGIC = "9901061802";
const SHORT = "1423";

const fixedMid = MID.replaceAll("-", "Y");
const lenFixed = fixedMid.length;

/**
 * @param sID {string} seasonId
 * @returns {string} the key for a given season Id
 */
function generateSeasonKey(sID) {
  let keyBuffer = "";
  let key = "";
  key += sID.substring(0, 2);

  // Setup key buffer
  for (let i = 0; i < lenFixed; i++) {
    keyBuffer += String.fromCharCode(fixedMid.charCodeAt(i) + 1);
  }

  // Create key from key buffer
  for (let i = 0; i < 4; i++) {
    const mixedIndex = parseInt(SHORT.at(i));
    const sIDSubstringIndex = 3 + (mixedIndex - 1) * 2 - 1;
    const keyBufferIndex =
      parseInt(sID.substring(sIDSubstringIndex, sIDSubstringIndex + 2)) - 1;

    key += keyBuffer.at(keyBufferIndex);
  }

  return key;
}

function generateProgramKey() {
  let keyBuffer = "";

  for (let i = 0; i < lenFixed; i++) {
    keyBuffer += String.fromCharCode(fixedMid.charCodeAt(i) + 1);
  }

  let key = MAGIC.substring(0, 2);

  for (let i = 0; i < 4; i++) {
    const mixedIndex = parseInt(SHORT.charAt(i));
    const magicSubstringIndex = 3 + (mixedIndex - 1) * 2 - 1;
    const keyBufferIndex = 
      parseInt(MAGIC.substring(magicSubstringIndex, magicSubstringIndex + 2)) - 1;

    key += keyBuffer.at(keyBufferIndex);
  }

  return key;
}

function generateRegistrationKey() {
  const programKey = generateProgramKey();
  const seasonKeys = _.chain(SEASON_IDS)
    .values()
    .map(sid => generateSeasonKey(sid))
    .value()

  const seasonKey = seasonKeys.join("")

  return `DUT:${programKey}${seasonKey}`;
}

console.log(generateRegistrationKey());
