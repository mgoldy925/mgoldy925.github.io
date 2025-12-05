const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxGVeugBr0qE0KiY-CiOm7ipvMvxCRZthib6S5QZth6vcTfmkuyYaH6qx3zU2Yqxu1_bA/exec';
const CORRECT = {
  1: 3_991,
  2: 577,
  3: 234_000_000,
  4: 5_149_900.8,
  5: 500_000,
  6: 11_388,
  7: 52_721,
  8: 12,
  9: 1_696_346,
  10: 145_000_000,
  11: 40,
  12: 123,
  13: 26_500_000_000_000_000_000
}
const TEAM_NAMES = {};

// Read cell using plain text output
async function readCell(row, col) {
  try {
    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ action: 'read', row, col })
    });

    const text = await res.text();
    return JSON.parse(text);
  } catch (err) {
    console.error("Read failed:", err);
    return null;
  }
}

// Write cell using plain text output
async function writeCell(row, col, value) {
  try {
    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'write', row, col, value })
    });

    const text = await res.text();
    const success = JSON.parse(text).success;
    return success;
  } catch (err) {
    console.error("Write failed:", err);
    return false;
  }
}

async function updateTeamNames() {
  for (let row = 4; row < 30; row++) {
    readCell(row, 1).then(response => {
      let teamName = response.value;
      if (teamName) {
        TEAM_NAMES[teamName] = row;
      }
    });
  }
}

function decrypt(value) {
  return value;
}

updateTeamNames();

document.getElementById('submitBtn').addEventListener('click', function () {
  const problem = document.getElementById('problem').value.trim();
  const team = document.getElementById('team').value.trim();
  const low = document.getElementById('low').value.trim();
  const high = document.getElementById('high').value.trim();
  const statusEl = document.getElementById('status');

  statusEl.textContent = '';
  statusEl.style.color = 'red';

  if (!problem || !team || !low || !high) {
    statusEl.textContent = 'All the input boxes must be filled in.';
    return;
  }

  const problemNum = parseInt(problem, 10);
  const lowNum = parseFloat(low);
  const highNum = parseFloat(high);

  if (isNaN(problemNum) || isNaN(lowNum) || isNaN(highNum)) {
    statusEl.textContent = 'Problem, Low, and High must be numbers.';
    return;
  }

  if (problemNum < 1 || problemNum > 13) {
    statusEl.textContent = 'Problem must be between 1 and 13.';
    return;
  }

  if (lowNum > highNum) {
    statusEl.textContent = 'Low must be less than or equal to High.';
    return;
  }

  if (!TEAM_NAMES.hasOwnProperty(team)) {
    statusEl.textContent = `Team ${team} does not exist.`;
    return;
  }

  let row = TEAM_NAMES[team];
  let col = problemNum + 1;
  let correctAnswer = decrypt(CORRECT[problem]);

  readCell(row, col).then(response => {
    let currentValue = String(response.value);
    let newValue = null;
    if (lowNum <= correctAnswer && correctAnswer <= highNum) {
      // Easy to make it best guess instead
      newValue = Math.floor(highNum/lowNum);
    } else {
      // This would be nicer if it was initially blank instead of hyphens
      // Currently overrides correct answers
      newValue = !(currentValue.includes('X')) ? 'X' : currentValue + 'X';
    }
    writeCell(row, col, newValue).then(success => {
      if (success) {
        statusEl.style.color = 'green';
        statusEl.textContent = `Successfully updated Row ${row} Column ${col} with value of ${newValue}!`;
      } else {
        statusEl.style.color = 'yellow';
        statusEl.textContent = 'Error occurred in updating scores. This isn\'t supposed to happen idk why it did.';
      }
    });
  })
});