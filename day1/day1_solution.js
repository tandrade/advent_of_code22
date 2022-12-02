
const fs = require('fs');
const readline = require('readline');

async function parseElfWeights() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
  });

  const allElves = []; 

  let currentElfTotal = 0; 
  for await (const line of rl) {
    if (line.length !== 0) { 
        // we're in the middle of reading an elf's pack 
        currentElfTotal += Number(line); 
    } else {
        // we have finished processing the elf pack 
        allElves.push(currentElfTotal); 
        currentElfTotal = 0;
    }
  }

  return allElves;
}

function sumNTopWeights (allWeights, n) { 
    // sort highest to lowest 
    sorted = allWeights.sort(function(a, b) {
        return b - a;
    })

    // get N highest 
    top_n = sorted.slice(0, n); 
    
    // and sum up! 
    return top_n.reduce((a, b) => a + b, 0); 
}

async function fetchMaxElfTotal() {     
    const allElves = await parseElfWeights();
    const totalHighestWeight = sumNTopWeights(allElves, 3);
    console.log(totalHighestWeight);    
}

fetchMaxElfTotal();