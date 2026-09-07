/**
 * POST /api/generate-quote-id
 * Returns the next sequential LSP evaluation reference number.
 * Response example: { quoteId: 1234, formatted: "LSP-001234" }
 */

import { NextResponse } from 'next/server';
import { backendConfig } from '@/lib/backendconnect';
import fs from 'fs';
import os from 'os';
import path from 'path';

const COUNTER_FILE = path.join(os.tmpdir(), 'quote-counter.json');
const COUNTER_TABLE = 'quote_counter';

function getNextFileCounter(): number {
  const dir = path.dirname(COUNTER_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  let current = 0;
  if (fs.existsSync(COUNTER_FILE)) {
    try {
      const raw = fs.readFileSync(COUNTER_FILE, 'utf-8');
      const data = JSON.parse(raw);
      current = data.counter || 0;
    } catch {
      current = 0;
    }
  }

  const next = current + 1;
  const tempFile = `${COUNTER_FILE}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify({ counter: next, updatedAt: new Date().toISOString() }));
  fs.renameSync(tempFile, COUNTER_FILE);
  return next;
}

async function getNextSupabaseCounter(): Promise<number> {
  const config = backendConfig.supabase;
  try {
    const response = await fetch(`${config.url}/rest/v1/rpc/increment_quote_counter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': config.anonKey,
        'Authorization': `Bearer ${config.anonKey}`,
      },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      const data = await response.json();
      return typeof data === 'number' ? data : data.counter || data;
    }

    const readRes = await fetch(`${config.url}/rest/v1/${COUNTER_TABLE}?id=eq.1&select=counter`, {
      headers: {
        'apikey': config.anonKey,
        'Authorization': `Bearer ${config.anonKey}`,
      },
    });

    if (readRes.ok) {
      const rows = await readRes.json();
      if (rows.length > 0) {
        const next = rows[0].counter + 1;
        await fetch(`${config.url}/rest/v1/${COUNTER_TABLE}?id=eq.1`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': config.anonKey,
            'Authorization': `Bearer ${config.anonKey}`,
          },
          body: JSON.stringify({ counter: next, updated_at: new Date().toISOString() }),
        });
        return next;
      }

      await fetch(`${config.url}/rest/v1/${COUNTER_TABLE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': config.anonKey,
          'Authorization': `Bearer ${config.anonKey}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ id: 1, counter: 1, updated_at: new Date().toISOString() }),
      });
      return 1;
    }

    throw new Error('Supabase counter unavailable');
  } catch {
    return getNextFileCounter();
  }
}

export async function POST() {
  try {
    let quoteId: number;
    const sb = backendConfig.supabase;
    if (sb.enabled && sb.url && sb.anonKey) quoteId = await getNextSupabaseCounter();
    else quoteId = getNextFileCounter();

    const formatted = `LSP-${String(quoteId).padStart(6, '0')}`;
    return NextResponse.json({ quoteId, formatted });
  } catch (error) {
    console.error(`Quote ID generation failed, using timestamp fallback: ${error instanceof Error ? error.message : 'Unknown'}`);
    const quoteId = Date.now() % 1000000;
    const formatted = `LSP-${String(quoteId).padStart(6, '0')}`;
    return NextResponse.json({ quoteId, formatted });
  }
}
