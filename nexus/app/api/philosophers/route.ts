import { NextResponse } from 'next/server';
import { query, formatPhilosopher } from '@/lib/db';

export async function GET() {
  try {
    // Fetch all philosophers
    const philosophersResult = await query(`
      SELECT * FROM philosophers
      ORDER BY birth_year ASC
    `);
    
    // Fetch all domain strengths
    const domainsResult = await query(`
      SELECT philosopher_id, domain, strength 
      FROM philosopher_domains
    `);
    
    // Fetch all influences
    const influencesResult = await query(`
      SELECT source_philosopher_id, target_philosopher_id, strength
      FROM influences
    `);
    
    // Fetch all critiques
    const critiquesResult = await query(`
      SELECT critic_philosopher_id, target_philosopher_id, strength
      FROM critiques
    `);
    
    // Create domain strength map
    const domainMap = new Map<string, Record<string, number>>();
    domainsResult.rows.forEach((row: any) => {
      if (!domainMap.has(row.philosopher_id)) {
        domainMap.set(row.philosopher_id, {});
      }
      const domains = domainMap.get(row.philosopher_id)!;
      domains[row.domain] = row.strength;
    });
    
    // Create influence and critique maps
    const influenceMap = new Map<string, Record<string, number>>();
    const critiqueMap = new Map<string, Record<string, number>>();
    
    influencesResult.rows.forEach((row: any) => {
      if (!influenceMap.has(row.target_philosopher_id)) {
        influenceMap.set(row.target_philosopher_id, {});
      }
      const influences = influenceMap.get(row.target_philosopher_id)!;
      influences[row.source_philosopher_id] = row.strength;
    });
    
    critiquesResult.rows.forEach((row: any) => {
      if (!critiqueMap.has(row.critic_philosopher_id)) {
        critiqueMap.set(row.critic_philosopher_id, {});
      }
      const critiques = critiqueMap.get(row.critic_philosopher_id)!;
      critiques[row.target_philosopher_id] = row.strength;
    });
    
    // Format philosophers with all their data
    const philosophers = philosophersResult.rows.map((row: any) => {
      const philosopher = formatPhilosopher(row);
      return {
        ...philosopher,
        domainStrengths: domainMap.get(row.id) || {},
        influenceMap: influenceMap.get(row.id) || {},
        critiqueMap: critiqueMap.get(row.id) || {},
        allDomains: Object.keys(domainMap.get(row.id) || {})
      };
    });
    
    return NextResponse.json(philosophers);
  } catch (error) {
    console.error('Error fetching philosophers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch philosophers' },
      { status: 500 }
    );
  }
}