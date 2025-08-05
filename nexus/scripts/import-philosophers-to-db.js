const fs = require('fs').promises;
const path = require('path');
const { Pool } = require('pg');

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Function to normalize philosopher data structure
function normalizePhilosopher(phil) {
  // Handle different data structure formats
  const normalized = {
    id: phil.id,
    name: phil.name,
    birthYear: phil.birthYear || phil.birth?.year,
    deathYear: phil.deathYear || phil.death?.year,
    birthCity: phil.birthLocation?.city || phil.birth?.location?.city,
    birthRegion: phil.birthLocation?.region || phil.birth?.location?.region,
    birthCountry: phil.birthLocation?.modernCountry || phil.birth?.location?.country,
    birthLatitude: phil.birthLocation?.coordinates?.[0] || phil.birth?.location?.coordinates?.latitude,
    birthLongitude: phil.birthLocation?.coordinates?.[1] || phil.birth?.location?.coordinates?.longitude,
    primaryDomain: phil.primaryDomain || phil.philosophical_domains?.primary?.[0],
    allDomains: phil.allDomains || phil.philosophical_domains?.primary || [],
    domainStrengths: phil.domainStrengths || phil.philosophical_domains?.domain_strengths_rating || phil.domain_strengths_rating || {},
    era: phil.era || phil.era_classification,
    eraPosition: phil.eraPosition !== undefined ? 
      (phil.eraPosition > 1 ? phil.eraPosition / 100 : phil.eraPosition) : 0.5, // Normalize to 0-1 range
    spiralDynamicsStage: phil.spiralDynamicsStage || phil.spiral_dynamics_stage,
    spiralJustification: phil.spiralJustification || phil.spiral_justification,
    philosophicalGenome: phil.philosophicalGenome || phil.philosophical_genome || {},
    switchPoints: phil.switchPoints || phil.switch_points || [],
    comprehensiveBiography: phil.comprehensiveBiography || phil.biography || phil.comprehensive_biography,
    intellectualJourney: phil.intellectualJourney || phil.intellectual_journey,
    historicalContext: phil.historicalContext || phil.historical_context,
    influences: phil.influences || [],
    critiques: phil.critiques || [],
    influenceMap: phil.influenceMap || {},
    critiqueMap: phil.critiqueMap || {}
  };
  
  // Ensure era_position is within valid range (0.00 to 0.99)
  if (normalized.eraPosition > 0.99) {
    normalized.eraPosition = 0.99;
  } else if (normalized.eraPosition < 0) {
    normalized.eraPosition = 0;
  }

  // Helper function to truncate strings
  const truncate = (str, maxLength) => {
    if (!str) return '';
    return str.length > maxLength ? str.substring(0, maxLength) : str;
  };

  // Normalize philosophical genome
  const genome = normalized.philosophicalGenome;
  const normalizedGenome = {
    beingVsBecoming: truncate(genome.beingVsBecoming || genome.being_vs_becoming?.position || genome.being_vs_becoming || '', 100),
    oneVsMany: truncate(genome.oneVsMany || genome.one_vs_many?.position || genome.one_vs_many || '', 100),
    mindVsMatter: truncate(genome.mindVsMatter || genome.mind_vs_matter?.position || genome.mind_vs_matter || '', 100),
    freedomVsDeterminism: truncate(genome.freedomVsDeterminism || genome.freedom_vs_determinism?.position || genome.freedom_vs_determinism || '', 100),
    transcendentVsImmanent: truncate(genome.transcendentVsImmanent || genome.transcendent_vs_immanent?.position || genome.transcendent_vs_immanent || '', 100),
    realismVsAntiRealism: truncate(genome.realismVsAntiRealism || genome.realism_vs_antirealism?.position || genome.realism_vs_antirealism || '', 100),
    reasonVsExperience: truncate(genome.reasonVsExperience || genome.reason_vs_experience?.position || genome.reason_vs_experience || '', 100),
    absoluteVsRelative: truncate(genome.absoluteVsRelative || genome.absolute_vs_relative?.position || genome.absolute_vs_relative || '', 100)
  };
  
  // Truncate other potentially long strings
  normalized.spiralDynamicsStage = truncate(normalized.spiralDynamicsStage, 100);
  normalized.primaryDomain = truncate(normalized.primaryDomain, 50);
  normalized.era = truncate(normalized.era, 50);

  normalized.philosophicalGenome = normalizedGenome;
  return normalized;
}

async function importPhilosophers() {
  try {
    console.log('Starting philosopher import...');
    
    // Read all JSON files from attached_assets
    const attachedAssetsDir = path.join(__dirname, '../../attached_assets');
    const files = await fs.readdir(attachedAssetsDir);
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    
    const allPhilosophers = new Map(); // Use Map to avoid duplicates
    
    // Process each JSON file
    for (const file of jsonFiles) {
      console.log(`Processing ${file}...`);
      const filePath = path.join(attachedAssetsDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      
      try {
        const data = JSON.parse(content);
        const philosophers = Array.isArray(data) ? data : [data];
        
        for (const phil of philosophers) {
          if (phil.id && phil.name) {
            const normalized = normalizePhilosopher(phil);
            allPhilosophers.set(normalized.id, normalized);
          }
        }
      } catch (err) {
        console.error(`Error parsing ${file}:`, err.message);
      }
    }
    
    console.log(`Found ${allPhilosophers.size} unique philosophers`);
    
    // Begin database transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Insert philosophers
      for (const [id, phil] of allPhilosophers) {
        console.log(`Inserting ${phil.name}...`);
        
        // Insert main philosopher record
        await client.query(`
          INSERT INTO philosophers (
            id, name, birth_year, death_year, birth_city, birth_region, birth_country,
            birth_latitude, birth_longitude, primary_domain, era, era_position,
            spiral_dynamics_stage, spiral_justification, being_vs_becoming, one_vs_many,
            mind_vs_matter, freedom_vs_determinism, transcendent_vs_immanent,
            realism_vs_antirealism, reason_vs_experience, absolute_vs_relative,
            comprehensive_biography, intellectual_journey, historical_context
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            birth_year = EXCLUDED.birth_year,
            death_year = EXCLUDED.death_year,
            birth_city = EXCLUDED.birth_city,
            birth_region = EXCLUDED.birth_region,
            birth_country = EXCLUDED.birth_country,
            birth_latitude = EXCLUDED.birth_latitude,
            birth_longitude = EXCLUDED.birth_longitude,
            primary_domain = EXCLUDED.primary_domain,
            era = EXCLUDED.era,
            era_position = EXCLUDED.era_position,
            spiral_dynamics_stage = EXCLUDED.spiral_dynamics_stage,
            spiral_justification = EXCLUDED.spiral_justification,
            being_vs_becoming = EXCLUDED.being_vs_becoming,
            one_vs_many = EXCLUDED.one_vs_many,
            mind_vs_matter = EXCLUDED.mind_vs_matter,
            freedom_vs_determinism = EXCLUDED.freedom_vs_determinism,
            transcendent_vs_immanent = EXCLUDED.transcendent_vs_immanent,
            realism_vs_antirealism = EXCLUDED.realism_vs_antirealism,
            reason_vs_experience = EXCLUDED.reason_vs_experience,
            absolute_vs_relative = EXCLUDED.absolute_vs_relative,
            comprehensive_biography = EXCLUDED.comprehensive_biography,
            intellectual_journey = EXCLUDED.intellectual_journey,
            historical_context = EXCLUDED.historical_context
        `, [
          phil.id,
          phil.name,
          phil.birthYear,
          phil.deathYear,
          phil.birthCity,
          phil.birthRegion,
          phil.birthCountry,
          phil.birthLatitude,
          phil.birthLongitude,
          phil.primaryDomain,
          phil.era,
          phil.eraPosition,
          phil.spiralDynamicsStage,
          phil.spiralJustification,
          phil.philosophicalGenome.beingVsBecoming,
          phil.philosophicalGenome.oneVsMany,
          phil.philosophicalGenome.mindVsMatter,
          phil.philosophicalGenome.freedomVsDeterminism,
          phil.philosophicalGenome.transcendentVsImmanent,
          phil.philosophicalGenome.realismVsAntiRealism,
          phil.philosophicalGenome.reasonVsExperience,
          phil.philosophicalGenome.absoluteVsRelative,
          phil.comprehensiveBiography,
          phil.intellectualJourney,
          phil.historicalContext
        ]);
        
        // Insert domain strengths
        for (const [domain, strength] of Object.entries(phil.domainStrengths)) {
          if (strength !== null && strength !== undefined) {
            // Convert decimal values (0.6) to percentage (60) if needed
            const strengthValue = strength < 1 ? Math.round(strength * 100) : Math.round(strength);
            if (strengthValue > 0) {
              await client.query(`
                INSERT INTO philosopher_domains (philosopher_id, domain, strength)
                VALUES ($1, $2, $3)
                ON CONFLICT DO NOTHING
              `, [phil.id, domain, strengthValue]);
            }
          }
        }
        
        // Insert switch points
        for (const switchPoint of phil.switchPoints) {
          if (switchPoint.question && switchPoint.position) {
            const result = await client.query(`
              INSERT INTO switch_points (philosopher_id, question, position, argument)
              VALUES ($1, $2, $3, $4)
              RETURNING id
            `, [phil.id, switchPoint.question, switchPoint.position, switchPoint.argument]);
            
            const switchPointId = result.rows[0].id;
            
            // Insert domain cascades
            if (switchPoint.domainCascades) {
              for (const [domain, impact] of Object.entries(switchPoint.domainCascades)) {
                if (impact) {
                  await client.query(`
                    INSERT INTO domain_cascades (switch_point_id, domain, impact)
                    VALUES ($1, $2, $3)
                  `, [switchPointId, domain, impact]);
                }
              }
            }
          }
        }
      }
      
      // Insert influences and critiques after all philosophers are inserted
      for (const [id, phil] of allPhilosophers) {
        // Insert influences
        for (const [targetId, strength] of Object.entries(phil.influenceMap)) {
          if (allPhilosophers.has(targetId) && strength > 0) {
            await client.query(`
              INSERT INTO influences (source_philosopher_id, target_philosopher_id, strength)
              VALUES ($1, $2, $3)
              ON CONFLICT DO NOTHING
            `, [id, targetId, strength]);
          }
        }
        
        // Insert critiques
        for (const [targetId, strength] of Object.entries(phil.critiqueMap)) {
          if (allPhilosophers.has(targetId) && strength > 0) {
            await client.query(`
              INSERT INTO critiques (critic_philosopher_id, target_philosopher_id, strength)
              VALUES ($1, $2, $3)
              ON CONFLICT DO NOTHING
            `, [id, targetId, strength]);
          }
        }
      }
      
      await client.query('COMMIT');
      console.log('Import completed successfully!');
      
      // Display summary
      const countResult = await client.query('SELECT COUNT(*) FROM philosophers');
      const domainResult = await client.query('SELECT COUNT(*) FROM philosopher_domains');
      const influenceResult = await client.query('SELECT COUNT(*) FROM influences');
      const critiqueResult = await client.query('SELECT COUNT(*) FROM critiques');
      
      console.log('\nImport Summary:');
      console.log(`- Philosophers: ${countResult.rows[0].count}`);
      console.log(`- Domain mappings: ${domainResult.rows[0].count}`);
      console.log(`- Influence relationships: ${influenceResult.rows[0].count}`);
      console.log(`- Critique relationships: ${critiqueResult.rows[0].count}`);
      
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
    
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the import
importPhilosophers();