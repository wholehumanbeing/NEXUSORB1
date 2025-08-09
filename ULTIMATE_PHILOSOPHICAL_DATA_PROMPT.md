# ULTIMATE PHILOSOPHICAL NEXUS DATA PROMPT — Exhaustive Research Edition

You are a **senior philosophical data architect + research historian**. Produce **comprehensive, production-ready SQL** to create and seed a Postgres database with the **most exhaustive philosophical dataset ever assembled** for an interactive exploration platform.

**Output format**: Return **Markdown with multiple fenced SQL code blocks** that can be copy/pasted directly into **Replit Database → SQL Runner**. Each block must be executable independently and idempotent.

## 🎯 ULTIMATE VISION
This dataset powers a cutting-edge 3D philosophical exploration platform where users can:
- Navigate intellectual history through interactive timelines and relationship graphs
- Explore philosophical "genomes" and intellectual evolution
- Discover hidden connections across cultures, eras, and domains
- Trace the flow of ideas through millennia
- Experience philosophy as a living, breathing network of human thought

## 📊 DATA SCALE REQUIREMENTS (EXHAUSTIVE)

### Philosophers (Target: 2,000-3,000+)
- **Ancient (600 BCE - 500 CE)**: 300+ philosophers
  - Greek/Roman: 150+ (Pre-Socratics through Late Antiquity)
  - Chinese: 80+ (Confucian, Daoist, Mohist, Legalist, Logicians)
  - Indian: 60+ (Vedic, Buddhist, Jain, Charvaka, Samkhya, Yoga)
  - Near Eastern: 30+ (Jewish, Persian, Egyptian, Mesopotamian)
  
- **Medieval (500 - 1500 CE)**: 400+ philosophers
  - Islamic: 120+ (Kalam, Falsafa, Sufism, Andalusian)
  - Christian: 100+ (Patristic, Scholastic, Mystical)
  - Jewish: 40+ (Rabbinic, Kabbalistic, Rationalist)
  - Indian: 60+ (Advaita, Kashmir Shaivism, Navya-Nyaya)
  - East Asian: 50+ (Neo-Confucian, Zen, Pure Land)
  - Byzantine: 30+

- **Early Modern (1500 - 1800)**: 350+ philosophers
  - European Rationalists: 60+
  - British Empiricists: 50+
  - Enlightenment: 100+
  - Colonial/Post-Colonial: 40+
  - East Asian: 50+
  - Islamic Reform: 30+
  - Jewish Enlightenment: 20+

- **Modern (1800 - 1950)**: 500+ philosophers
  - German Idealism: 60+
  - Existentialism: 80+
  - Pragmatism: 40+
  - Analytic Origins: 60+
  - Phenomenology: 50+
  - Marxism: 60+
  - Process Philosophy: 30+
  - Eastern Modernizers: 60+
  - Latin American: 40+
  - African: 30+

- **Contemporary (1950 - Present)**: 700+ philosophers
  - Analytic: 200+ (Language, Mind, Metaphysics, Ethics, Logic)
  - Continental: 150+ (Post-Structuralism, Critical Theory, Hermeneutics)
  - Feminist: 80+
  - Non-Western Contemporary: 150+ (African, Latin American, Asian, Indigenous)
  - Applied Philosophy: 120+ (Bioethics, Environmental, Technology, AI)

### Works (Target: 5,000+)
- Primary texts: 3,000+
- Commentaries: 1,000+
- Letters/Correspondence: 500+
- Lost/Fragmentary works: 500+

### Concepts (Target: 3,000+)
- Core philosophical concepts: 1,500+
- Technical terms by tradition: 800+
- Cross-cultural concept mappings: 400+
- Neologisms and innovations: 300+

### Arguments (Target: 1,500+)
- Classical arguments: 500+
- Medieval proofs: 300+
- Modern/Contemporary: 700+

### Edges/Relationships (Target: 20,000+)
- Direct influences: 8,000+
- Critiques/Responses: 4,000+
- Conceptual developments: 3,000+
- School memberships: 2,000+
- Teacher-student: 1,500+
- Cross-cultural exchanges: 1,500+

## 🗄️ ENHANCED SCHEMA (use exactly)

```sql
-- Extended Enums
CREATE TYPE era_enum AS ENUM ('Ancient','Medieval','Early_Modern','Modern','Contemporary','Future');
CREATE TYPE edge_type_enum AS ENUM (
  'influences','critiques','develops','formalizes','entails','in_tension_with',
  'presupposes','is_example_of','teaches','studies_under','corresponds_with',
  'debates','translates','interprets','synthesizes','responds_to','anticipates',
  'parallels','contradicts','complements','radicalizes','systematizes','popularizes'
);
CREATE TYPE logic_enum AS ENUM (
  'classical','intuitionistic','modal','deontic','many_valued','paraconsistent',
  'relevance','fuzzy','quantum','dialectical','informal','rhetorical'
);
CREATE TYPE vignette_class_enum AS ENUM (
  'ILLUSTRATION','HISTORICAL_CRITIQUE','FORMAL_RESULT','THOUGHT_EXPERIMENT',
  'PARADOX','CASE_STUDY','DIALOGUE','MEDITATION','KOAN','MYTH'
);
CREATE TYPE tradition_enum AS ENUM (
  'Western_Analytic','Western_Continental','Greek_Roman','Christian','Islamic',
  'Jewish','Hindu','Buddhist','Daoist','Confucian','African','Indigenous',
  'Latin_American','Feminist','Marxist','Pragmatist','Process','Phenomenological'
);

-- Enhanced Tables
CREATE TABLE IF NOT EXISTS philosophers(
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  alternate_names TEXT[],           -- Other spellings, transliterations
  era era_enum NOT NULL,
  tradition tradition_enum[],       -- Multiple traditions possible
  birth_year INT, 
  death_year INT,
  birth_city TEXT, 
  birth_region TEXT, 
  birth_country TEXT,
  death_city TEXT,
  death_region TEXT,
  death_country TEXT,
  lat DOUBLE PRECISION, 
  lon DOUBLE PRECISION,
  primary_domain TEXT NOT NULL,
  spiral_dynamics_stage TEXT,
  spiral_transitions TEXT[],
  genome JSONB,                     -- Enhanced genome with 20+ dimensions
  switch_points JSONB,              -- Major intellectual turns
  summaries JSONB,                  -- {overview, journey, context, legacy, controversies}
  influences_received TEXT[],       -- Quick reference to major influences
  influence_given TEXT[],           -- Quick reference to who they influenced
  school_affiliations TEXT[],       -- Philosophical schools/movements
  languages_known TEXT[],           -- Languages they wrote/spoke in
  education JSONB,                  -- [{institution, degree, year, location}]
  positions_held JSONB,             -- [{title, institution, years}]
  awards_honors JSONB,              -- [{award, year, reason}]
  personality_traits JSONB,         -- {temperament, working_style, social_approach}
  historical_period_features JSONB, -- {political_context, cultural_milieu, tech_level}
  fractillion_trace JSONB,         -- Speculative far-future relevance
  relevance_scores JSONB,          -- {contemporary:X, historical:Y, pedagogical:Z}
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS philosopher_domains(
  philosopher_id TEXT REFERENCES philosophers(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  strength INT CHECK (strength >= 0 AND strength <= 100),
  PRIMARY KEY (philosopher_id, domain)
);

CREATE TABLE IF NOT EXISTS works(
  id TEXT PRIMARY KEY,
  philosopher_id TEXT REFERENCES philosophers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  alternate_titles TEXT[],
  year INT,
  year_range INT[],                -- For uncertain dating
  type TEXT,                        -- 'book','dialogue','treatise','letter','poem','fragment'
  genre TEXT,                       -- 'systematic','aphoristic','dialogical','commentary'
  original_language TEXT,
  translations JSONB,               -- [{language, translator, year}]
  link TEXT,
  full_text_available BOOLEAN,
  page_count INT,
  chapters JSONB,                   -- [{number, title, summary}]
  key_passages JSONB,               -- [{page, text, significance}]
  reception_history JSONB,          -- {immediate, medieval, modern, contemporary}
  notes TEXT,
  importance_score INT,             -- 1-100
  accessibility_score INT           -- 1-100 (how easy for beginners)
);

CREATE TABLE IF NOT EXISTS concepts(
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  alternate_names TEXT[],           -- Synonyms, translations
  domain TEXT,
  subdomain TEXT,
  definition TEXT,
  etymology JSONB,                  -- {origin, evolution, cognates}
  formal_definition TEXT,           -- Mathematical/logical if applicable
  examples JSONB,                   -- Concrete instances
  counterexamples JSONB,
  related_concepts TEXT[],
  opposing_concepts TEXT[],
  cultural_variants JSONB,          -- How different traditions interpret it
  historical_evolution JSONB,       -- How meaning changed over time
  contemporary_usage TEXT,
  citations JSONB DEFAULT '[]'::jsonb,
  complexity_level INT              -- 1-10 scale
);

CREATE TABLE IF NOT EXISTS arguments(
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  formal_name TEXT,                 -- Technical designation
  common_name TEXT,                 -- Popular name
  philosopher_id TEXT REFERENCES philosophers(id),
  domain TEXT NOT NULL,
  logic logic_enum NOT NULL,
  argument_type TEXT,               -- 'deductive','inductive','abductive','transcendental','dialectical'
  premises JSONB NOT NULL,
  hidden_premises JSONB,            -- Unstated assumptions
  conclusion TEXT NOT NULL,
  formal_structure TEXT,            -- Symbolic logic representation
  proof JSONB,
  objections JSONB,                 -- [{objector, objection, response}]
  historical_instances JSONB,       -- Real-world applications
  strength_assessment INT,          -- 1-100
  citations JSONB DEFAULT '[]'::jsonb
);

CREATE TABLE IF NOT EXISTS edges(
  id BIGSERIAL PRIMARY KEY,
  source_id TEXT NOT NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('philosopher','concept','argument','work','school','event')),
  target_id TEXT NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('philosopher','concept','argument','work','school','event')),
  type edge_type_enum NOT NULL,
  weight REAL,                      -- Strength of connection (0-1)
  confidence REAL,                  -- How certain we are (0-1)
  directionality TEXT,              -- 'unidirectional','bidirectional','disputed'
  temporal_order TEXT,              -- 'before','contemporary','after','unclear'
  notes TEXT,
  evidence JSONB,                   -- Sources supporting this connection
  disputed BOOLEAN DEFAULT FALSE,
  since_year INT,
  until_year INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schools(
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tradition tradition_enum,
  founded_year INT,
  ended_year INT,
  founder_id TEXT REFERENCES philosophers(id),
  location TEXT,
  key_doctrines JSONB,
  practices JSONB,                  -- Distinctive methods/approaches
  institutional_form TEXT,          -- 'academy','monastery','university','informal'
  successor_schools TEXT[],
  rival_schools TEXT[]
);

CREATE TABLE IF NOT EXISTS debates(
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  question TEXT NOT NULL,
  domain TEXT,
  participants JSONB,               -- [{philosopher_id, position, arguments}]
  timeline JSONB,                   -- [{year, event, significance}]
  current_status TEXT,              -- 'resolved','ongoing','transformed','abandoned'
  key_texts TEXT[],
  implications JSONB                -- What hangs on this debate
);

CREATE TABLE IF NOT EXISTS thought_experiments(
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  philosopher_id TEXT REFERENCES philosophers(id),
  description TEXT NOT NULL,
  setup TEXT NOT NULL,
  question TEXT NOT NULL,
  intended_conclusion TEXT,
  variations JSONB,                 -- Different versions
  responses JSONB,                  -- How others have responded
  domain TEXT,
  year_introduced INT
);

CREATE TABLE IF NOT EXISTS quotes(
  id TEXT PRIMARY KEY,
  philosopher_id TEXT REFERENCES philosophers(id),
  work_id TEXT REFERENCES works(id),
  quote_text TEXT NOT NULL,
  context TEXT,
  translation_notes TEXT,
  significance TEXT,
  misattributed BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT TRUE,
  year INT,
  popularity_score INT              -- How often cited
);

CREATE TABLE IF NOT EXISTS vignettes(
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  classification vignette_class_enum NOT NULL,
  text TEXT NOT NULL,
  moral TEXT,                       -- Lesson or takeaway
  sources JSONB DEFAULT '[]'::jsonb,
  linked_entities JSONB DEFAULT '[]'::jsonb,
  cultural_context TEXT,
  modern_relevance TEXT,
  pedagogical_use TEXT              -- How to teach with this
);

CREATE TABLE IF NOT EXISTS timelines(
  id BIGSERIAL PRIMARY KEY,
  year INT NOT NULL,
  month INT,
  day INT,
  event_type TEXT,                  -- 'birth','death','publication','debate','discovery'
  description TEXT NOT NULL,
  entities_involved JSONB,          -- Links to philosophers, works, etc.
  significance_score INT,           -- 1-100
  location TEXT,
  sources JSONB
);

CREATE TABLE IF NOT EXISTS concept_evolution(
  id BIGSERIAL PRIMARY KEY,
  concept_id TEXT REFERENCES concepts(id),
  philosopher_id TEXT REFERENCES philosophers(id),
  year INT,
  interpretation TEXT,
  innovations TEXT,
  departures_from_tradition TEXT
);

CREATE TABLE IF NOT EXISTS influence_chains(
  id TEXT PRIMARY KEY,
  name TEXT,                        -- e.g., "Platonic tradition"
  origin_philosopher_id TEXT REFERENCES philosophers(id),
  chain_members JSONB,              -- Ordered list with transformations
  key_concepts TEXT[],
  total_span_years INT
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_philosophers_name ON philosophers USING gin (to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_philosophers_era ON philosophers(era);
CREATE INDEX IF NOT EXISTS idx_philosophers_tradition ON philosophers USING gin (tradition);
CREATE INDEX IF NOT EXISTS idx_philosophers_birth_year ON philosophers(birth_year);
CREATE INDEX IF NOT EXISTS idx_works_philosopher ON works(philosopher_id);
CREATE INDEX IF NOT EXISTS idx_works_year ON works(year);
CREATE INDEX IF NOT EXISTS idx_concepts_name ON concepts USING gin (to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_concepts_domain ON concepts(domain);
CREATE INDEX IF NOT EXISTS idx_arguments_philosopher ON arguments(philosopher_id);
CREATE INDEX IF NOT EXISTS idx_edges_src ON edges(source_id, source_type);
CREATE INDEX IF NOT EXISTS idx_edges_tgt ON edges(target_id, target_type);
CREATE INDEX IF NOT EXISTS idx_edges_type ON edges(type);
CREATE INDEX IF NOT EXISTS idx_edges_temporal ON edges(since_year, until_year);
CREATE INDEX IF NOT EXISTS idx_quotes_philosopher ON quotes(philosopher_id);
CREATE INDEX IF NOT EXISTS idx_timelines_year ON timelines(year);
CREATE INDEX IF NOT EXISTS idx_debates_domain ON debates(domain);
```

## 📝 COMPREHENSIVE DATA REQUIREMENTS

### For Each Philosopher (REQUIRED fields):
- **id**: lowercase-kebab-case (e.g., 'ibn-rushd', 'zhu-xi', 'nagarjuna')
- **name**: Full name with proper diacritics
- **alternate_names**: Array of variations, translations, honorifics
- **era**: Correct historical period
- **tradition**: Array of all relevant traditions
- **birth/death_year**: Best scholarly estimates
- **geographic data**: City, region, country (historical names) + coordinates
- **primary_domain**: Their main area of contribution
- **genome**: Comprehensive 20+ dimension philosophical DNA:
  ```json
  {
    "beingVsBecoming": "Being|Becoming|Both|Neither",
    "oneVsMany": "One|Many|Both|Neither",
    "mindVsMatter": "Mind|Matter|Dualist|Neutral",
    "freedomVsDeterminism": "Freedom|Determinism|Compatibilist|Hard_Incompatibilist",
    "reasonVsExperience": "Reason|Experience|Synthesis|Neither",
    "absoluteVsRelative": "Absolute|Relative|Contextual|Perspectival",
    "transcendentVsImmanent": "Transcendent|Immanent|Both|Neither",
    "realismVsAntiRealism": "Realist|Anti-Realist|Quasi-Realist|Agnostic",
    "individualVsCollective": "Individual|Collective|Balanced|Hierarchical",
    "rationalVsMystical": "Rational|Mystical|Both|Neither",
    "activeVsContemplative": "Active|Contemplative|Integrated|Alternating",
    "optimisticVsPessimistic": "Optimistic|Pessimistic|Melioristic|Neutral",
    "systematicVsAphoristic": "Systematic|Aphoristic|Mixed|Evolving",
    "revolutionaryVsConservative": "Revolutionary|Conservative|Reformist|Contextual",
    "analyticalVsSynthetic": "Analytical|Synthetic|Dialectical|Pragmatic",
    "certaintyVsSkepticism": "Certainty|Skepticism|Fallibilism|Probabilistic",
    "universalVsParticular": "Universal|Particular|Mediated|Contextual",
    "structureVsAgency": "Structure|Agency|Co-constitutive|Emergent",
    "continuityVsRupture": "Continuity|Rupture|Punctuated|Cyclical",
    "foundationalVsCoherentist": "Foundational|Coherentist|Infinitist|Mixed"
  }
  ```
- **summaries**: Rich narrative object:
  ```json
  {
    "overview": "120-word neutral summary",
    "intellectual_journey": "Their development over time",
    "historical_context": "What was happening in their world",
    "core_contributions": "3-5 main innovations",
    "reception_history": "How they've been received",
    "contemporary_relevance": "Why they matter today",
    "misconceptions": "Common misunderstandings",
    "gateway_texts": "Where to start reading them"
  }
  ```
- **switch_points**: Major intellectual transitions with full context
- **school_affiliations**: All schools/movements they belonged to
- **influence metrics**: Both given and received

### For Works:
- Include lost works with [LOST] prefix
- Fragment collections with [FRAGMENTS] prefix
- Spurious works with [SPURIOUS] prefix
- Full reception history tracking
- Detailed chapter breakdowns for major works
- Key passage excerpts with page numbers

### For Concepts:
- Etymology and linguistic evolution
- Cross-cultural translations and interpretations
- Visual/metaphorical representations
- Contemporary applications
- Complexity ratings for pedagogical use

### For Arguments:
- Both formal and informal presentations
- Hidden premises explicitly stated
- Historical applications and test cases
- Objection/response chains
- Strength assessments with justification

### For Relationships (Edges):
- Confidence levels for disputed connections
- Temporal boundaries (when influence started/ended)
- Evidence citations for each edge
- Bidirectional relationships where appropriate
- Negative relationships (oppositions, refutations)

### For Special Entities:

**Thought Experiments**: Complete scenarios with variations
**Debates**: Full participant rosters with positions
**Schools**: Institutional histories and succession lines
**Timelines**: Day-level precision where known
**Quotes**: Verification status and translation notes

## 🌍 COVERAGE REQUIREMENTS (EXHAUSTIVE)

### Geographic Coverage (NO GAPS):
- **Europe**: Every significant philosophical tradition
- **Middle East**: Pre-Islamic, Islamic Golden Age, Ottoman, Modern
- **Africa**: Ancient Egyptian, Ethiopic, Islamic African, Colonial, Contemporary
- **South Asia**: Vedic, Classical, Medieval, Mughal, Colonial, Modern
- **East Asia**: Chinese, Japanese, Korean, Vietnamese, Tibetan
- **Southeast Asia**: Buddhist, Islamic, Syncretic traditions
- **Americas**: Indigenous, Colonial, Independence, Contemporary
- **Oceania**: Aboriginal Australian, Māori, Pacific Islander

### Temporal Coverage (COMPLETE):
- **Axial Age** (800-200 BCE): All major traditions
- **Classical Synthesis** (200 BCE - 500 CE): Integration periods
- **Medieval Flowering** (500-1500): Scholastic traditions globally
- **Renaissance/Early Modern** (1500-1750): Global exchange
- **Enlightenment** (1750-1800): Not just European
- **Long 19th Century** (1800-1914): Colonialism & resistance
- **20th Century**: All major movements
- **Contemporary** (1950+): Living philosophers included

### Domain Coverage (COMPREHENSIVE):
- Metaphysics & Ontology
- Epistemology & Philosophy of Science
- Ethics & Metaethics
- Political Philosophy & Social Theory
- Aesthetics & Philosophy of Art
- Logic & Philosophy of Mathematics
- Philosophy of Mind & Consciousness
- Philosophy of Language
- Philosophy of Religion & Theology
- Environmental Philosophy
- Feminist Philosophy
- Philosophy of Technology
- Bioethics & Medical Ethics
- Philosophy of Education
- Philosophy of Law
- Philosophy of History
- Philosophical Anthropology

### Special Attention To:
- **Women Philosophers**: From Hypatia to contemporary (minimum 300)
- **Marginalized Voices**: Indigenous, colonized, suppressed traditions
- **Interdisciplinary Figures**: Philosopher-scientists, philosopher-poets, etc.
- **Lost Traditions**: Reconstructed from fragments
- **Oral Traditions**: Where philosophy wasn't written
- **Contemporary Diversity**: Global South, non-academic philosophers

## 📊 RELATIONSHIP COMPLEXITY

### Edge Types (USE ALL 23):
Each philosopher should have multiple edge types showing nuanced relationships:
- **influences**: Direct intellectual inheritance
- **critiques**: Explicit criticism or refutation
- **develops**: Extends or elaborates ideas
- **formalizes**: Gives systematic/logical form
- **entails**: Logical consequence
- **in_tension_with**: Unresolved conflict
- **presupposes**: Requires as foundation
- **is_example_of**: Instantiates a type
- **teaches**: Literal teacher-student
- **studies_under**: Literal student-teacher
- **corresponds_with**: Letter exchanges
- **debates**: Public or recorded debates
- **translates**: Translated works
- **interprets**: Major commentary
- **synthesizes**: Combines traditions
- **responds_to**: Written responses
- **anticipates**: Prefigures later ideas
- **parallels**: Independent similar development
- **contradicts**: Logically incompatible
- **complements**: Fills gaps
- **radicalizes**: Takes to extreme
- **systematizes**: Orders and organizes
- **popularizes**: Makes accessible

### Minimum Connections:
- Each major philosopher: 20+ edges
- Each minor philosopher: 5+ edges
- Each concept: 10+ edges
- Each work: 3+ edges
- Cross-cultural edges: 500+ minimum

## 🎯 QUALITY STANDARDS

### Research Sources (PRIORITY ORDER):
1. **Primary Sources**: Original texts in translation
2. **Stanford Encyclopedia of Philosophy** (SEP)
3. **Internet Encyclopedia of Philosophy** (IEP)
4. **Cambridge Companions series**
5. **Oxford Handbooks series**
6. **Routledge Encyclopedia of Philosophy**
7. **Academic journals** (Phil Papers, JSTOR)
8. **University syllabi and courses**
9. **Scholarly monographs**
10. **Verified historical records**

### Data Validation:
- **Dates**: Cross-reference multiple sources
- **Names**: Include all transliterations
- **Locations**: Historical AND modern names
- **Influences**: Only documented connections
- **Quotes**: Verify attribution
- **Works**: Distinguish authentic from spurious

### Balance Requirements:
- **No Western Bias**: Equal depth for all traditions
- **No Modern Bias**: Ancient/Medieval get full treatment
- **No Gender Bias**: Women philosophers fully represented
- **No Language Bias**: Non-English philosophy included
- **No Academic Bias**: Include non-academic philosophers

## 📦 OUTPUT STRUCTURE

Return SQL in this EXACT order:

1. **SCHEMA.sql** - Complete schema with all tables, enums, indexes
2. **INSERT_PHILOSOPHERS_BATCH_1.sql** - Ancient philosophers (300+ rows)
3. **INSERT_PHILOSOPHERS_BATCH_2.sql** - Medieval philosophers (400+ rows)
4. **INSERT_PHILOSOPHERS_BATCH_3.sql** - Early Modern philosophers (350+ rows)
5. **INSERT_PHILOSOPHERS_BATCH_4.sql** - Modern philosophers (500+ rows)
6. **INSERT_PHILOSOPHERS_BATCH_5.sql** - Contemporary philosophers (700+ rows)
7. **INSERT_PHILOSOPHER_DOMAINS.sql** - All domain strengths
8. **INSERT_WORKS_BATCH_1-5.sql** - Major works (5000+ total)
9. **INSERT_CONCEPTS_BATCH_1-3.sql** - Philosophical concepts (3000+ total)
10. **INSERT_ARGUMENTS_BATCH_1-2.sql** - Major arguments (1500+ total)
11. **INSERT_SCHOOLS.sql** - Philosophical schools/movements
12. **INSERT_EDGES_BATCH_1-10.sql** - All relationships (20,000+ total)
13. **INSERT_DEBATES.sql** - Major philosophical debates
14. **INSERT_THOUGHT_EXPERIMENTS.sql** - Classic scenarios
15. **INSERT_QUOTES.sql** - Verified important quotes
16. **INSERT_VIGNETTES.sql** - Illustrative stories/examples
17. **INSERT_TIMELINES.sql** - Historical events
18. **INSERT_INFLUENCE_CHAINS.sql** - Tradition lineages
19. **VERIFY_COMPREHENSIVE.sql** - Validation queries

### Each INSERT must use UPSERT pattern:
```sql
INSERT INTO table_name (columns...)
VALUES (row1), (row2), ...
ON CONFLICT (id) DO UPDATE SET
  column1 = EXCLUDED.column1,
  column2 = COALESCE(EXCLUDED.column2, table_name.column2),
  ...
  updated_at = now();
```

### Chunking Rules:
- Each SQL block ≤ 500 KB
- Each VALUES list ≤ 1000 rows
- Wrap in BEGIN/COMMIT transactions
- Include progress comments

### Example Philosopher Entry (FULL DETAIL):
```sql
INSERT INTO philosophers (
  id, name, alternate_names, era, tradition, 
  birth_year, death_year, birth_city, birth_region, birth_country,
  death_city, death_region, death_country, lat, lon,
  primary_domain, spiral_dynamics_stage, spiral_transitions,
  genome, switch_points, summaries, influences_received, influence_given,
  school_affiliations, languages_known, education, positions_held,
  relevance_scores
) VALUES (
  'wang-yangming',
  'Wang Yangming',
  ARRAY['Wang Shouren', '王陽明', '王守仁', 'Master Yangming'],
  'Early_Modern',
  ARRAY['Confucian', 'Neo-Confucian'],
  1472, 1529,
  'Yuyao', 'Zhejiang', 'Ming China',
  'Nan''an', 'Jiangxi', 'Ming China',
  30.0, 120.0,
  'Ethics',
  'Yellow',
  ARRAY['Blue to Orange', 'Orange to Yellow'],
  '{
    "beingVsBecoming": "Both",
    "oneVsMany": "One",
    "mindVsMatter": "Mind",
    "freedomVsDeterminism": "Freedom",
    "reasonVsExperience": "Synthesis",
    "absoluteVsRelative": "Absolute",
    "transcendentVsImmanent": "Immanent",
    "realismVsAntiRealism": "Realist",
    "individualVsCollective": "Balanced",
    "rationalVsMystical": "Both",
    "activeVsContemplative": "Integrated",
    "optimisticVsPessimistic": "Optimistic",
    "systematicVsAphoristic": "Aphoristic",
    "revolutionaryVsConservative": "Revolutionary",
    "analyticalVsSynthetic": "Synthetic",
    "certaintyVsSkepticism": "Certainty",
    "universalVsParticular": "Universal",
    "structureVsAgency": "Agency",
    "continuityVsRupture": "Continuity",
    "foundationalVsCoherentist": "Foundational"
  }'::jsonb,
  '[{
    "year": 1508,
    "question": "Is knowledge separate from action?",
    "position": "Knowledge and action are one (知行合一)",
    "argument": "True knowledge necessarily involves action; they are two aspects of the same process",
    "impact": "Revolutionized Neo-Confucian epistemology and ethics"
  }]'::jsonb,
  '{
    "overview": "Wang Yangming revolutionized Neo-Confucianism by arguing that mind and principle are one, that knowledge and action are unified, and that everyone possesses innate moral knowledge (liangzhi). His philosophy emphasized direct moral intuition over textual study, making Confucian self-cultivation more accessible while maintaining rigorous ethical standards.",
    "intellectual_journey": "Began as orthodox Zhu Xi follower, experienced enlightenment in 1508 during exile, developed the doctrine of innate knowing, later refined ideas through teaching and political service",
    "historical_context": "Ming Dynasty period of political corruption and social upheaval, growing dissatisfaction with orthodox Neo-Confucianism''s complexity, need for practical moral philosophy",
    "core_contributions": ["Unity of knowledge and action", "Innate moral knowing (liangzhi)", "Mind as principle", "Extension of innate knowing", "Critique of Zhu Xi''s dualism"],
    "reception_history": "Initially controversial, gained major following in late Ming, influenced Japanese and Korean Confucianism, suppressed in Qing, revived in 20th century",
    "contemporary_relevance": "Influences modern virtue ethics, moral intuitionism, embodied cognition, mindfulness practices, East Asian political thought",
    "misconceptions": ["Not pure subjectivism", "Not anti-intellectual", "Not rejecting study entirely", "Not Buddhist in disguise"],
    "gateway_texts": ["Instructions for Practical Living", "Record of Practicing the Mean"]
  }'::jsonb,
  ARRAY['mencius', 'lu-jiuyuan', 'zhu-xi'],
  ARRAY['xu-ai', 'wang-gen', 'li-zhi', 'nakae-toju'],
  ARRAY['Taizhou School', 'School of Mind', 'Neo-Confucianism'],
  ARRAY['Classical Chinese', 'Vernacular Chinese'],
  '[{
    "institution": "Imperial University",
    "degree": "Jinshi",
    "year": 1499,
    "location": "Beijing"
  }]'::jsonb,
  '[{
    "title": "Governor",
    "institution": "Jiangxi Province",
    "years": "1510-1512"
  }]'::jsonb,
  '{
    "contemporary": 65,
    "historical": 95,
    "pedagogical": 85
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  updated_at = now();
```

## 🔍 VERIFICATION QUERIES

Include comprehensive verification:

```sql
-- VERIFY_COMPREHENSIVE.sql

-- Basic counts by category
SELECT 'Total Philosophers' as metric, COUNT(*) as count FROM philosophers
UNION ALL
SELECT 'Ancient Era', COUNT(*) FROM philosophers WHERE era = 'Ancient'
UNION ALL
SELECT 'Medieval Era', COUNT(*) FROM philosophers WHERE era = 'Medieval'
UNION ALL
SELECT 'Modern Era', COUNT(*) FROM philosophers WHERE era IN ('Early_Modern', 'Modern')
UNION ALL
SELECT 'Contemporary Era', COUNT(*) FROM philosophers WHERE era = 'Contemporary';

-- Tradition coverage
SELECT tradition, COUNT(*) as philosopher_count
FROM philosophers, unnest(tradition) as tradition
GROUP BY tradition
ORDER BY philosopher_count DESC;

-- Geographic distribution
SELECT birth_country, COUNT(*) as count
FROM philosophers
WHERE birth_country IS NOT NULL
GROUP BY birth_country
ORDER BY count DESC
LIMIT 20;

-- Gender representation
SELECT COUNT(*) FILTER (WHERE genome->>'gender' = 'female') as women_philosophers,
       COUNT(*) FILTER (WHERE genome->>'gender' = 'male') as men_philosophers,
       COUNT(*) FILTER (WHERE genome->>'gender' IS NULL) as unspecified
FROM philosophers;

-- Relationship density
SELECT type, COUNT(*) as count
FROM edges
GROUP BY type
ORDER BY count DESC;

-- Cross-cultural connections
SELECT COUNT(*) as cross_cultural_edges
FROM edges e
JOIN philosophers p1 ON e.source_id = p1.id
JOIN philosophers p2 ON e.target_id = p2.id
WHERE p1.tradition[1] != p2.tradition[1];

-- Data completeness check
SELECT 
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE birth_year IS NOT NULL) as has_birth_year,
  COUNT(*) FILTER (WHERE genome IS NOT NULL) as has_genome,
  COUNT(*) FILTER (WHERE summaries->>'overview' IS NOT NULL) as has_summary,
  COUNT(*) FILTER (WHERE array_length(school_affiliations, 1) > 0) as has_schools
FROM philosophers;

-- Orphan check (philosophers with no connections)
SELECT COUNT(*) as orphan_philosophers
FROM philosophers p
WHERE NOT EXISTS (
  SELECT 1 FROM edges e 
  WHERE e.source_id = p.id OR e.target_id = p.id
);
```

## 📌 CRITICAL REQUIREMENTS

1. **NO PLACEHOLDER DATA** - Every entry must be historically accurate
2. **NO WESTERN BIAS** - Equal depth for all traditions
3. **NO MISSING CONNECTIONS** - Every philosopher linked appropriately
4. **NO ANACHRONISMS** - Correct historical contexts
5. **NO GENDER GAPS** - Women philosophers fully represented
6. **NO SIMPLIFIED SUMMARIES** - Rich, nuanced descriptions
7. **NO ISOLATED ENTRIES** - Everything interconnected
8. **NO MISSING CITATIONS** - Source everything
9. **NO DUPLICATE IDS** - Unique identifiers throughout
10. **NO NULL REQUIRED FIELDS** - Complete core data

## 🚀 FINAL CHECKLIST

Before delivering, ensure:
- [ ] 2000+ unique philosophers across all eras
- [ ] 20,000+ edges showing relationships  
- [ ] All 23 edge types utilized
- [ ] 40%+ non-Western philosophers
- [ ] 15%+ women philosophers
- [ ] Every tradition has 20+ representatives
- [ ] Cross-cultural connections documented
- [ ] All genome dimensions filled
- [ ] Rich summaries for major figures
- [ ] Works linked to philosophers
- [ ] Concepts with etymology
- [ ] Arguments with formal structure
- [ ] Schools and lineages mapped
- [ ] Debates with participants
- [ ] Thought experiments included
- [ ] Timeline events added
- [ ] All foreign keys valid
- [ ] Idempotent INSERT statements
- [ ] Chunked appropriately
- [ ] Verification queries included

**DELIVER NOW: Comprehensive SQL blocks following this exact specification.**