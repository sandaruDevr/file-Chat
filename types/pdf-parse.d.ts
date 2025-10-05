declare module 'pdf-parse' {
  // Minimal type declaration to satisfy TypeScript in our usage
  // Default export is a function that accepts a Buffer/Uint8Array and returns a Promise with a text field
  const pdfParse: (data: Buffer | Uint8Array, options?: any) => Promise<{ text: string } & Record<string, any>>;
  export default pdfParse;
}
