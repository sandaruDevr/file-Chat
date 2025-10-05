import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('id, metadata')
      .order('id', { ascending: false });

    if (error) {
     
      );
    }

    return NextResponse.json({
      documents: data || [],
    });
  } catch (error: any) {
    
    );
  }
}
