import _ from "lodash";

const MID = "";
const SHORT = "3412";

/**
 * @param sCode {string} seasonId
 * @returns {string} the key for a given season Id
 */
function generateKey(sCode) {
  let key = "";
  key += sCode.substring(0, 2);

  // Create key from MID
  for (let i = 0; i < 4; i++) {
    const mixedIndex = parseInt(SHORT.at(i));
    const sCodeSubstringIndex = 3 + (mixedIndex - 1) * 2 - 1;
    const midIndex =
      parseInt(sCode.substring(sCodeSubstringIndex, sCodeSubstringIndex + 2)) - 1;

    key += MID.at(midIndex);
  }

  return key;
}

function generateProgramKey() {
  return generateKey("5545342311");
}

function generateRegistrationKey() {
  const programKey = generateProgramKey();
  const sCodeKeys = _.chain(SEASON_IDS)
    .values()
    .map(sid => generateSeasonKey(sid))
    .value()

  const sCodeKey = sCodeKeys.join("")

  return `DUT:${programKey}${sCodeKey}`;
}

console.log(generateRegistrationKey())


