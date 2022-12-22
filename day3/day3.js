const fs = require('fs');
const readline = require('readline');
const { isModuleNamespaceObject } = require('util/types');


function splitWord(line) { 
  midpoint = line.length / 2; 
  return [line.substring(0, midpoint), line.substring(midpoint)];
}

function countNewLetter(counter, letter) { 
  if (counter[letter]) {
    counter[letter] += 1;
  } else { 
    counter[letter] = 1;
  }
  return counter; 
}

function findDuplicateLetters(word1, word2) { 
  // get distinct counts for each word
  word1Counts = word1.split('').reduce(countNewLetter, {});
  word2Counts = word2.split('').reduce(countNewLetter, {});

  // find objects in common and then sum together
  return Object.keys(word1Counts).filter(w => !!word2Counts[w]);

}

function sumLetterValues(letters) { 
  // add 0 to make sure index is right
  stringVals = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters.reduce((acc, val) => {
    return acc + stringVals.indexOf(val);
  }, 0);
}

async function getDupeItemsTotal() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
  }); 

  let part1Tally = 0;
  let part2Tally = 0; 

  let elfBag1 = null; 
  let elfBag2 = null; 

  for await (const line of rl) {
    // PART 1 
    const [word1, word2] = splitWord(line);
    dupes = findDuplicateLetters(word1, word2);
    part1Tally += sumLetterValues(dupes); 

    // PART 2 
    if (!elfBag1) { 
      elfBag1 = line;
    } else if (!elfBag2) { 
      elfBag2 = line; 
    } else { 
      // we're on the third elf! 

      // get all possible dupes from first two bags
      possibleCandidates = findDuplicateLetters(elfBag1, elfBag2); 
      // then treat that as a word and find the duplicates with the current word 
      allDuplicates = findDuplicateLetters(possibleCandidates.join(), line);
      part2Tally += sumLetterValues(allDuplicates);

      // reset values at the end; 
      elfBag1 = null; 
      elfBag2 = null; 
    }
  }

  return [part1Tally, part2Tally];
}

async function getResults() { 
  console.log(await getDupeItemsTotal());
}

// unit testing splitWord 
// console.log(splitWord("aaaabbbb"))
// console.log(splitWord("abcdefghij"))

// // unit testing findDuplicateLetters 
// console.log(findDuplicateLetters("aaaa", "abcd"))
// console.log(findDuplicateLetters("abbbccdefgh", "aabbccdefgh"))

// // unit testing sumLetterValues 
// console.log(sumLetterValues(['a', 'A']));
// console.log(sumLetterValues(['a', 'b', 'c']));

getResults();

