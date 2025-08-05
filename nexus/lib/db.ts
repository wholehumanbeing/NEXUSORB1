import { Pool } from 'pg';

// Create a singleton pool instance
let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }
  return pool;
}

export async function query(text: string, params?: any[]) {
  const pool = getPool();
  const result = await pool.query(text, params);
  return result;
}

// Helper to convert database row to philosopher format
export function formatPhilosopher(row: any) {
  return {
    id: row.id,
    name: row.name,
    birthYear: row.birth_year,
    deathYear: row.death_year,
    birthLocation: {
      city: row.birth_city,
      region: row.birth_region,
      modernCountry: row.birth_country,
      coordinates: [row.birth_latitude || 0, row.birth_longitude || 0]
    },
    primaryDomain: row.primary_domain,
    era: row.era,
    eraPosition: parseFloat(row.era_position || '0.5'),
    spiralDynamicsStage: row.spiral_dynamics_stage,
    spiralJustification: row.spiral_justification,
    philosophicalGenome: {
      beingVsBecoming: row.being_vs_becoming,
      oneVsMany: row.one_vs_many,
      mindVsMatter: row.mind_vs_matter,
      freedomVsDeterminism: row.freedom_vs_determinism,
      transcendentVsImmanent: row.transcendent_vs_immanent,
      realismVsAntiRealism: row.realism_vs_antirealism,
      reasonVsExperience: row.reason_vs_experience,
      absoluteVsRelative: row.absolute_vs_relative
    },
    comprehensiveBiography: row.comprehensive_biography,
    intellectualJourney: row.intellectual_journey,
    historicalContext: row.historical_context
  };
}