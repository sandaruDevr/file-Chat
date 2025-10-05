import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { data } = await supabase
    .from('documents')
    .select('id, metadata')
    .order('id', { ascending: false });

  return NextResponse.json({
    documents: data || [],
  });
}
