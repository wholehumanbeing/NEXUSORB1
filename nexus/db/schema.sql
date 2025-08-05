-- Drop existing tables if they exist
DROP TABLE IF EXISTS domain_cascades CASCADE;
DROP TABLE IF EXISTS switch_points CASCADE;
DROP TABLE IF EXISTS critiques CASCADE;
DROP TABLE IF EXISTS influences CASCADE;
DROP TABLE IF EXISTS philosopher_domains CASCADE;
DROP TABLE IF EXISTS philosophers CASCADE;

-- Create philosophers table
CREATE TABLE philosophers (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  birth_year INTEGER,
  death_year INTEGER,
  birth_city VARCHAR(100),
  birth_region VARCHAR(100),
  birth_country VARCHAR(100),
  birth_latitude DECIMAL(9,6),
  birth_longitude DECIMAL(9,6),
  primary_domain VARCHAR(50),
  era VARCHAR(20),
  era_position DECIMAL(3,2),
  spiral_dynamics_stage VARCHAR(50),
  spiral_justification TEXT,
  being_vs_becoming VARCHAR(20),
  one_vs_many VARCHAR(20),
  mind_vs_matter VARCHAR(20),
  freedom_vs_determinism VARCHAR(20),
  transcendent_vs_immanent VARCHAR(20),
  realism_vs_antirealism VARCHAR(20),
  reason_vs_experience VARCHAR(20),
  absolute_vs_relative VARCHAR(20),
  comprehensive_biography TEXT,
  intellectual_journey TEXT,
  historical_context TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create philosopher_domains table
CREATE TABLE philosopher_domains (
  id SERIAL PRIMARY KEY,
  philosopher_id VARCHAR(100),
  domain VARCHAR(50),
  strength INTEGER,
  FOREIGN KEY (philosopher_id) REFERENCES philosophers(id) ON DELETE CASCADE
);

-- Create switch_points table
CREATE TABLE switch_points (
  id SERIAL PRIMARY KEY,
  philosopher_id VARCHAR(100),
  question TEXT,
  position TEXT,
  argument TEXT,
  FOREIGN KEY (philosopher_id) REFERENCES philosophers(id) ON DELETE CASCADE
);

-- Create domain_cascades table
CREATE TABLE domain_cascades (
  id SERIAL PRIMARY KEY,
  switch_point_id INTEGER,
  domain VARCHAR(50),
  impact TEXT,
  FOREIGN KEY (switch_point_id) REFERENCES switch_points(id) ON DELETE CASCADE
);

-- Create influences table
CREATE TABLE influences (
  id SERIAL PRIMARY KEY,
  source_philosopher_id VARCHAR(100),
  target_philosopher_id VARCHAR(100),
  strength INTEGER,
  influence_type VARCHAR(20) DEFAULT 'influence',
  FOREIGN KEY (source_philosopher_id) REFERENCES philosophers(id) ON DELETE CASCADE,
  FOREIGN KEY (target_philosopher_id) REFERENCES philosophers(id) ON DELETE CASCADE
);

-- Create critiques table
CREATE TABLE critiques (
  id SERIAL PRIMARY KEY,
  critic_philosopher_id VARCHAR(100),
  target_philosopher_id VARCHAR(100),
  strength INTEGER,
  critique_type VARCHAR(20) DEFAULT 'critique',
  FOREIGN KEY (critic_philosopher_id) REFERENCES philosophers(id) ON DELETE CASCADE,
  FOREIGN KEY (target_philosopher_id) REFERENCES philosophers(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_philosophers_era ON philosophers(era);
CREATE INDEX idx_philosophers_primary_domain ON philosophers(primary_domain);
CREATE INDEX idx_philosopher_domains_philosopher_id ON philosopher_domains(philosopher_id);
CREATE INDEX idx_switch_points_philosopher_id ON switch_points(philosopher_id);
CREATE INDEX idx_influences_source ON influences(source_philosopher_id);
CREATE INDEX idx_influences_target ON influences(target_philosopher_id);
CREATE INDEX idx_critiques_critic ON critiques(critic_philosopher_id);
CREATE INDEX idx_critiques_target ON critiques(target_philosopher_id);