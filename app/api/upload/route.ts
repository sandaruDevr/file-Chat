import { NextRequest, NextResponse } from 'next/server';

// Force Node.js runtime for this route (required for file parsers and OpenAI SDK)
export const runtime = 'nodejs';
const UPLOAD_WEBHOOK_URL =
  process.env.UPLOAD_WEBHOOK_URL ||
  'https://sadux2334.app.n8n.cloud/webhook/dd61a6a6-7341-450a-bff1-16e3b92254cd';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Forward the original file as raw binary to external webhook
    const buffer = Buffer.from(await file.arrayBuffer());
    const response = await fetch(UPLOAD_WEBHOOK_URL, {
      method: 'POST',
      // Send raw binary with original MIME type; include filename as header for convenience
      headers: {
        'Content-Type': file.type || 'application/octet-stream',
        'X-Filename': encodeURIComponent(file.name),
      },
      body: buffer,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      return NextResponse.json(
        { error: `Upstream webhook error (${response.status})`, details: text },
        { status: 502 }
      );
    }

    // Try to pass through JSON, otherwise return text
    let upstream: any = null;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      upstream = await response.json();
    } else {
      upstream = await response.text();
    }

    return NextResponse.json({ success: true, upstream });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload document' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message:
      'Document upload endpoint. Use POST with multipart/form-data including a single "file" (.txt, .pdf, .docx).',
  });
}
