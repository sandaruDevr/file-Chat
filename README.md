# Document Chat Assistant

A modern Next.js web application that allows users to upload documents, extract their content, store them in Supabase with OpenAI embeddings, and chat with the documents using AI.

## Features

- 📁 **File Upload**: Upload `.txt`, `.pdf`, and `.docx` files
- 🔍 **Content Extraction**: Automatically extracts text content from uploaded files
- 🤖 **AI Embeddings**: Generates embeddings using OpenAI's text-embedding-ada-002 model
- 💾 **Supabase Storage**: Stores documents with content, metadata, and embeddings
- 💬 **Chat Interface**: Ask questions about your uploaded documents
- 🎨 **Modern UI**: Beautiful, user-friendly interface built with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase
- **AI**: OpenAI API
- **File Parsing**: 
  - mammoth (for .docx files)
  - pdf-parse (for .pdf files)

## Prerequisites
Before running this application, make sure you have:

- Node.js 18+ installed
- A Supabase account and project
- An OpenAI API key
  - The webhook endpoints configured (n8n or similar)

## Supabase Setup

Create a table named `documents` in your Supabase database with the following columns:
CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB,
  embedding VECTOR(1536),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Note**: You'll need to enable the `pgvector` extension in Supabase:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

## Installation

1. **Clone or navigate to the project directory**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   
   Create a `.env.local` file in the root directory with the following variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   WEBHOOK_URL=https://sadux2334.app.n8n.cloud/webhook/b770c760-44c0-4c4c-aa30-cd60897a1a6b
   UPLOAD_WEBHOOK_URL=https://sadux2334.app.n8n.cloud/webhook/dd61a6a6-7341-450a-bff1-16e3b92254cd
   ```

   Replace the placeholders with your actual credentials:
   - Get Supabase credentials from your Supabase project settings
   - Get OpenAI API key from https://platform.openai.com/api-keys
   - The webhook URL is pre-configured for your n8n instance

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## Usage

### Uploading Documents

1. Click on the **Upload** tab
2. Click the upload area or drag and drop a file (.txt, .pdf, or .docx)
3. Click the **Upload** button
4. The app will:
   - Extract text content from the file
   - Generate embeddings using OpenAI
   - Store everything in Supabase

### Chatting with Documents

1. Switch to the **Chat** tab
2. Type your question in the input field
3. Click **Send**
4. The question is sent to the chat webhook (`WEBHOOK_URL`) which processes it with your backend
5. The AI response appears in the chat

## API Routes

### POST `/api/upload`

Forwards uploaded files to the external workflow specified by `UPLOAD_WEBHOOK_URL`.

**Request Body** (FormData):
- `file`: Document file (`.txt`, `.pdf`, `.docx`)

**Response**:
```json
{
  "success": true,
  "upstream": { ... } // Depends on your webhook response
}
```

### POST `/api/chat`

Handles chat messages and sends them to the webhook.

**Request Body**:
```json
{
  "question": "Your question here"
}
```

**Response**:
```json
{
  "answer": "AI response here"
}
```

## File Structure

```
langtest/
├── app/
│   ├── api/
│   │   ├── upload/
│   │   │   └── route.ts      # File upload API
│   │   └── chat/
│   │       └── route.ts      # Chat API
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page (Upload + Chat)
├── lib/
│   ├── supabase.ts          # Supabase client
│   ├── openai.ts            # OpenAI utilities
│   └── fileParser.ts        # File parsing utilities
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

**Upload fails with "Unsupported file type"**:
- Make sure you're uploading .txt, .pdf, or .docx files only

**Supabase errors**:
- Verify your Supabase URL and anon key are correct
- Check that the `documents` table exists with the correct schema
- Ensure the `pgvector` extension is enabled

**OpenAI errors**:
- Verify your API key is valid
- Check your OpenAI account has sufficient credits

**Chat not working**:
- Verify the webhook URL is accessible
- Check the webhook endpoint is returning data in the expected format: `[{"output": "answer"}]`

## License

MIT
