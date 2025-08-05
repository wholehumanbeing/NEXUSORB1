# Comprehensive Philosopher Database Research & Formatting Prompt

## Mission
Research and compile comprehensive data for 100 major philosophers across all eras, formatted for both JSON and SQL database insertion into a 3D philosophical visualization application.

## Target Philosophers List
Research these 100 philosophers (add more as needed to reach 100):

### Ancient Era (25 philosophers)
Socrates, Plato, Aristotle, Confucius, Laozi, Mencius, Xunzi, Zhuangzi, Buddha, Nagarjuna, Augustine, Plotinus, Epictetus, Marcus Aurelius, Heraclitus, Parmenides, Democritus, Protagoras, Pythagoras, Empedocles, Anaxagoras, Thales, Anaximander, Diogenes, Epicurus

### Medieval Era (20 philosophers)  
Thomas Aquinas, Duns Scotus, William of Ockham, Averroes (Ibn Rushd), Avicenna (Ibn Sina), Al-Farabi, Al-Ghazali, Maimonides, Anselm of Canterbury, Abelard, John Duns Scotus, Roger Bacon, Boethius, Pseudo-Dionysius, John Damascene, Origen, Tertullian, Clement of Alexandria, Ibn Khaldun, Rumi

### Modern Era (35 philosophers)
René Descartes, Baruch Spinoza, Gottfried Leibniz, John Locke, George Berkeley, David Hume, Immanuel Kant, Johann Fichte, Friedrich Schelling, Georg Hegel, Arthur Schopenhauer, Søren Kierkegaard, Friedrich Nietzsche, John Stuart Mill, Jeremy Bentham, Thomas Hobbes, Jean-Jacques Rousseau, Voltaire, Denis Diderot, Blaise Pascal, Francis Bacon, Thomas More, Niccolò Machiavelli, Giordano Bruno, Galileo Galilei, Isaac Newton, Adam Smith, Edmund Burke, Mary Wollstonecraft, Olympe de Gouges, Frederick Douglass, Karl Marx, Max Weber, Émile Durkheim, John Dewey

### Contemporary Era (20 philosophers)
Ludwig Wittgenstein, Martin Heidegger, Jean-Paul Sartre, Simone de Beauvoir, Maurice Merleau-Ponty, Emmanuel Levinas, Jacques Derrida, Michel Foucault, Jürgen Habermas, John Rawls, Robert Nozick, Alasdair MacIntyre, Charles Taylor, Martha Nussbaum, Judith Butler, Cornel West, Peter Singer, Thomas Nagel, Daniel Dennett, Patricia Churchland

## Required Data Structure

For each philosopher, provide complete data in this exact JSON format:

```json
{
  "id": "philosopher_firstname_lastname", 
  "name": "Full Name",
  "birthYear": -400 or 1650,
  "deathYear": -350 or 1720,
  "birthLocation": {
    "city": "City Name",
    "region": "Region/State",
    "modernCountry": "Modern Country Name", 
    "coordinates": [latitude, longitude]
  },
  "primaryDomain": "One of: Logic, Ethics, Metaphysics, Epistemology, Politics, Aesthetics, Philosophy of Religion, Philosophy of Science",
  "allDomains": ["Array", "of", "all", "domains", "they", "contributed", "to"],
  "domainStrengths": {
    "Logic": 0-100,
    "Ethics": 0-100,
    "Metaphysics": 0-100,
    "Epistemology": 0-100,
    "Politics": 0-100,
    "Aesthetics": 0-100,
    "Philosophy of Religion": 0-100,
    "Philosophy of Science": 0-100
  },
  "era": "Ancient | Medieval | Modern | Contemporary",
  "eraPosition": 0.0-1.0,
  "spiralDynamicsStage": "Purple | Red | Blue | Orange | Green | Yellow | Turquoise | Coral | Purple-Red | Blue-Orange | Orange-Green | Green-Yellow | Yellow-Turquoise",
  "spiralJustification": "2-3 sentence explanation of their Spiral Dynamics classification",
  "spiralTransitions": ["Array of transitions if applicable"],
  "philosophicalGenome": {
    "beingVsBecoming": "Being | Becoming | Both",
    "oneVsMany": "One | Many | Both", 
    "mindVsMatter": "Mind | Matter | Dualist | Synthesis",
    "freedomVsDeterminism": "Freedom | Determinism | Both",
    "transcendentVsImmanent": "Transcendent | Immanent | Both",
    "realismVsAntiRealism": "Realist | Anti-realist | Both",
    "reasonVsExperience": "Reason | Experience | Synthesis",
    "absoluteVsRelative": "Absolute | Relative | Both"
  },
  "switchPoints": [
    {
      "question": "Their defining philosophical question",
      "position": "Their position/answer",
      "argument": "1-2 sentence summary of their argument",
      "domainCascades": {
        "Domain1": "How this position affects this domain",
        "Domain2": "How this position affects this domain"
      }
    }
  ],
  "comprehensiveBiography": "2-3 paragraph comprehensive biography",
  "intellectualJourney": "2-3 sentence summary of their intellectual development",
  "influences": ["Array", "of", "philosopher", "names", "who", "influenced", "them"],
  "critiques": ["Array", "of", "philosopher", "names", "or", "positions", "they", "critiqued"],
  "influenceMap": {
    "philosopher_id_1": 0-100,
    "philosopher_id_2": 0-100
  },
  "critiqueMap": {
    "philosopher_id_3": 0-100,
    "philosopher_id_4": 0-100
  }
}
```

## Spiral Dynamics Framework
Classify each philosopher using Spiral Dynamics levels:

- **Purple (Tribal)**: Mythic, ritualistic, ancestor worship
- **Red (Egocentric)**: Power-driven, might makes right, heroic
- **Blue (Absolutistic)**: Order, hierarchy, absolute truth, systematic
- **Orange (Multiplistic)**: Achievement, individualism, scientific rationality
- **Green (Relativistic)**: Pluralistic, egalitarian, community-focused
- **Yellow (Systemic)**: Integrative, complex systems thinking
- **Turquoise (Holistic)**: Global consciousness, spiritual integration
- **Coral (Post-Holistic)**: Emerging collective intelligence

Use hyphenated combinations (e.g., "Blue-Orange") for transitional figures.

## Philosophical Genome Dimensions
For each philosopher, determine their position on these 8 fundamental dimensions:

1. **Being vs Becoming**: Do they emphasize eternal, unchanging reality (Being) or process, change, development (Becoming)?
2. **One vs Many**: Do they seek unity/monism (One) or accept plurality/diversity (Many)?
3. **Mind vs Matter**: Do they prioritize mental/spiritual reality (Mind), physical reality (Matter), or see them as dual aspects?
4. **Freedom vs Determinism**: Do they emphasize human agency (Freedom) or causal necessity (Determinism)?
5. **Transcendent vs Immanent**: Do they locate ultimate reality beyond the world (Transcendent) or within it (Immanent)?
6. **Realist vs Anti-realist**: Do they believe in objective truth (Realist) or see truth as constructed (Anti-realist)?
7. **Reason vs Experience**: Do they prioritize rational thought (Reason) or empirical observation (Experience)?
8. **Absolute vs Relative**: Do they seek universal truths (Absolute) or contextual understanding (Relative)?

## Research Requirements

### Primary Sources
- Read actual philosophical texts, not just summaries
- Reference specific works, arguments, and quotes
- Understand their historical context and influences

### Biographical Research
- Accurate birth/death dates and locations with coordinates
- Major life events that shaped their philosophy  
- Educational background and influences
- Historical and cultural context

### Philosophical Analysis
- Identify their 2-3 most important philosophical contributions
- Map their influences from earlier philosophers
- Identify who they critiqued and how
- Rate their strength in each philosophical domain (0-100 scale)

### Connection Mapping
- Create influence maps with numerical ratings (0-100) showing how much each philosopher influenced them
- Create critique maps showing their philosophical opposition/criticism relationships
- Ensure bidirectional connections make sense historically

## SQL Database Schema

Generate SQL INSERT statements for these tables:

```sql
-- Philosophers table
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Domains table
CREATE TABLE philosopher_domains (
  philosopher_id VARCHAR(100),
  domain VARCHAR(50),
  strength INTEGER,
  FOREIGN KEY (philosopher_id) REFERENCES philosophers(id)
);

-- Switch points table  
CREATE TABLE switch_points (
  id SERIAL PRIMARY KEY,
  philosopher_id VARCHAR(100),
  question TEXT,
  position TEXT,
  argument TEXT,
  FOREIGN KEY (philosopher_id) REFERENCES philosophers(id)
);

-- Domain cascades table
CREATE TABLE domain_cascades (
  switch_point_id INTEGER,
  domain VARCHAR(50),
  impact TEXT,
  FOREIGN KEY (switch_point_id) REFERENCES switch_points(id)
);

-- Influences table
CREATE TABLE influences (
  source_philosopher_id VARCHAR(100),
  target_philosopher_id VARCHAR(100),
  strength INTEGER,
  influence_type VARCHAR(20) DEFAULT 'influence',
  FOREIGN KEY (source_philosopher_id) REFERENCES philosophers(id),
  FOREIGN KEY (target_philosopher_id) REFERENCES philosophers(id)
);

-- Critiques table
CREATE TABLE critiques (
  critic_philosopher_id VARCHAR(100),
  target_philosopher_id VARCHAR(100),
  strength INTEGER,
  critique_type VARCHAR(20) DEFAULT 'critique',
  FOREIGN KEY (critic_philosopher_id) REFERENCES philosophers(id),
  FOREIGN KEY (target_philosopher_id) REFERENCES philosophers(id)
);
```

## Output Format

Provide two files:

### 1. philosophers_data.json
Complete JSON array with all 100 philosophers in the exact format specified above.

### 2. philosophers_database.sql  
Complete SQL script with:
- Table creation statements
- INSERT statements for all philosophers
- INSERT statements for all domains, switch points, influences, and critiques

## Quality Standards

- **Accuracy**: All biographical data must be historically accurate
- **Completeness**: Every field must be filled with researched data, no placeholders
- **Consistency**: Use consistent naming conventions and formats
- **Scholarly**: Base all philosophical analysis on actual scholarship, not Wikipedia summaries
- **Connections**: Ensure influence and critique relationships are historically accurate and bidirectional where appropriate

## Research Methodology

1. Start with Stanford Encyclopedia of Philosophy entries
2. Cross-reference with Internet Encyclopedia of Philosophy  
3. Consult primary sources where available
4. Use academic databases (JSTOR, PhilPapers, etc.)
5. Verify biographical data with multiple sources
6. For coordinates, use precise latitude/longitude of birth cities

## Final Validation

Before submitting, verify:
- All 100 philosophers have complete data
- No missing or placeholder values
- All influence/critique connections reference valid philosopher IDs
- Birth/death dates are historically accurate
- Spiral Dynamics classifications are philosophically justified
- SQL syntax is correct and complete

This dataset will power a 3D philosophical visualization where users can explore 2,500+ years of philosophical thought through an immersive spatial interface.