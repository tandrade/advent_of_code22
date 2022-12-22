const fs = require('fs');
const readline = require('readline');

pointDictionary = { 
    // winning combos
    "A Z": 6 + 2, // to win against rock, play paper (2)
    "B Z": 6 + 3, // to win against paper, play scissors (3) 
    "C Z": 6 + 1, // to win against scissors, play rock (1) 
    // drawing combos 
    "A Y": 3 + 1, // to draw against rock, play rock (1)
    "B Y": 3 + 2,  // to draw against paper, play paper (2)
    "C Y": 3 + 3,  // to draw against scissors, play scissors (3)
    // losing combos
    "A X": 0 + 3, // to lose against rock, play scissors (3)
    "B X": 0 + 1, // to lose against paper, play rock (1)
    "C X": 0 + 2,  // to lose against scissors, play paper (2)
}


async function parseAndCountStrategies() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
  });

  let pointTally = 0; 

  for await (const line of rl) {
    pointTally += pointDictionary[line]
  }

  return pointTally;
}

async function sumGameTotal() {     
    console.log(await parseAndCountStrategies());
}

sumGameTotal();