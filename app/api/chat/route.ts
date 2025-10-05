import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL =
  process.env.WEBHOOK_URL ||
  'https://sadux2334.app.n8n.cloud/webhook/b770c760-44c0-4c4c-aa30-cd60897a1a6b';

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: 'No question provided' },
        { status: 400 }
      );
    }

    // Send question to webhook via GET with query parameter
    const webhookUrl = `${WEBHOOK_URL}?question=${encodeURIComponent(question)}`;
    console.log('Sending to webhook:', webhookUrl);
    
    const response = await fetch(webhookUrl, {
      method: 'GET',
    });

    console.log('Webhook response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Webhook error response:', errorText);
      throw new Error(`Webhook returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Webhook response data:', JSON.stringify(data, null, 2));
    
    // Extract answer from response format: [{"output": "answer"}]
    let answer;
    
    if (Array.isArray(data) && data.length > 0) {
      answer = data[0]?.output;
      console.log('Extracted answer from array:', answer);
    } else if (data?.output) {
      answer = data.output;
      console.log('Extracted answer from object:', answer);
    } else {
      answer = null;
      console.log('No answer found in response. Full data:', data);
    }
    
    if (!answer) {
      answer = 'No answer received from webhook';
    }

    return NextResponse.json({
      answer,
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get answer' },
      { status: 500 }
    );
  }
}
