const fs = require('fs');
const path = require('path');

// Read the attached data file
const attachedDataPath = path.join(__dirname, '../../attached_assets/all data_1754414921236.md');
const rawContent = fs.readFileSync(attachedDataPath, 'utf-8');

// Extract JSON content - the file starts with ```json and contains JSON data
let jsonContent = rawContent;
if (jsonContent.startsWith('```json')) {
  jsonContent = jsonContent.substring(7); // Remove ```json
}

// Find where the JSON array should end - look for the last complete philosopher object
// Since the file might be truncated, we'll try to extract complete objects
const philosopherMatches = jsonContent.match(/\{[^{}]*"id":\s*"[^"]+",[\s\S]*?"comprehensiveBiography":[^}]+\}/g);

if (!philosopherMatches) {
  console.error('Could not find valid philosopher objects in the file');
  process.exit(1);
}

// Reconstruct a valid JSON array from the matches
let philosophers;
try {
  const validJson = '[' + philosopherMatches.join(',') + ']';
  philosophers = JSON.parse(validJson);
} catch (error) {
  console.error('Failed to parse philosopher data:', error);
  // Try a different approach - extract individual complete objects
  philosophers = [];
  for (const match of philosopherMatches) {
    try {
      const obj = JSON.parse(match);
      if (obj.id && obj.name) {
        philosophers.push(obj);
      }
    } catch (e) {
      // Skip invalid objects
    }
  }
  
  if (philosophers.length === 0) {
    console.error('Could not extract any valid philosopher objects');
    process.exit(1);
  }
}

console.log(`Found ${philosophers.length} philosophers in the data`);

// Process each philosopher to ensure all required fields and add connections
const processedPhilosophers = philosophers.map(phil => {
  // Ensure all required fields exist
  const processed = {
    ...phil,
    // Ensure influences and critiques arrays exist
    influences: phil.influences || [],
    critiques: phil.critiques || [],
    // Generate influence and critique maps based on the data
    influenceMap: {},
    critiqueMap: {}
  };

  // Add some sample connections based on historical relationships
  // This is a simplified version - in a real app, you'd have more sophisticated logic
  if (phil.id === 'kant_immanuel') {
    processed.influenceMap = {
      'hume_david': 85,
      'rousseau_jean': 70,
      'leibniz_gottfried': 65
    };
    processed.critiqueMap = {
      'berkeley_george': 75,
      'locke_john': 60
    };
  } else if (phil.id === 'aristotle') {
    processed.influenceMap = {
      'plato': 95
    };
    processed.critiqueMap = {
      'plato': 80
    };
  } else if (phil.id === 'nietzsche_friedrich') {
    processed.influenceMap = {
      'schopenhauer_arthur': 90,
      'kant_immanuel': 70
    };
    processed.critiqueMap = {
      'kant_immanuel': 85,
      'plato': 90,
      'aristotle': 75
    };
  } else if (phil.id === 'spinoza_baruch') {
    processed.influenceMap = {
      'descartes_rene': 85,
      'maimonides': 70
    };
    processed.critiqueMap = {
      'descartes_rene': 80
    };
  }

  // Ensure all domain strengths are numbers
  if (processed.domainStrengths) {
    Object.keys(processed.domainStrengths).forEach(key => {
      processed.domainStrengths[key] = Number(processed.domainStrengths[key]);
    });
  }

  // Ensure coordinates are numbers
  if (processed.birthLocation && processed.birthLocation.coordinates) {
    processed.birthLocation.coordinates = processed.birthLocation.coordinates.map(Number);
  }

  return processed;
});

// Write the processed data to the public data directory
const outputPath = path.join(__dirname, '../public/data/philosophers.json');
fs.writeFileSync(outputPath, JSON.stringify(processedPhilosophers, null, 2));

console.log(`Successfully processed and saved ${processedPhilosophers.length} philosophers to ${outputPath}`);

// Also create a backup of the original limited data
const backupPath = path.join(__dirname, '../public/data/philosophers-backup.json');
if (fs.existsSync(path.join(__dirname, '../public/data/philosophers.json'))) {
  const currentData = fs.readFileSync(path.join(__dirname, '../public/data/philosophers.json'), 'utf-8');
  fs.writeFileSync(backupPath, currentData);
  console.log('Backed up current data to', backupPath);
}