const fs = require('fs');
const readline = require('readline');
const { arrayBuffer } = require('stream/consumers');

function generateRange(min, max) { 
    return Array(max - min + 1).fill().map((_, index) => index + min);
}

function parseInputTimes(input) {
    parts = input.split(",");
    return parts.map(p => {
        subparts = p.split("-");
        if (subparts.length != 2) { 
            console.log("Invalid input!", subparts);
        }
        beginning = parseInt(subparts[0]);
        end = parseInt(subparts[1]); 

        return generateRange(beginning, end);
    }) 

}

function isSubset(arr1, arr2) {
    return !arr1.filter(x => !arr2.includes(x)).length; 
}

function hasOverlap(arr1, arr2) {
    diff = arr1.filter(x => !arr2.includes(x));
    return diff.length < arr1.length;
}


async function calculateDuplicateTime() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
  }); 

  let part1Tally = 0; 
  let part2Tally = 0;

  for await (const line of rl) {
      [expandedTime1, expandedTime2] = parseInputTimes(line); 
      if (isSubset(expandedTime1, expandedTime2) || isSubset(expandedTime2, expandedTime1)) { 
        part1Tally += 1;
      }
      if (hasOverlap(expandedTime1, expandedTime2) || hasOverlap(expandedTime1, expandedTime2)) { 
        part2Tally += 1;
      }
  }

  return [part1Tally, part2Tally];
}

async function getResults() { 
  console.log(await calculateDuplicateTime());
}

// unit tests! 
// console.log(generateRange(1, 3)); 
// console.log(generateRange(10, 20));

// console.log(parseInputTimes('12-15,34-37'));

// console.log(isSubset(['a', 'b'], ['a', 'b', 'c']));
// console.log(isSubset(['a', 'f'], ['a', 'b', 'c']));

// console.log(hasOverlap(['a', 'b'], ['a', 'c', 'd']));
// console.log(hasOverlap(['a', 'b'], ['c', 'd']));

getResults();

