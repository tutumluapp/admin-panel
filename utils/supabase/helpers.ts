export function mapSchemaTypeToHTMLInput(schemaType: string) {
  const schemaTypeToHTMLInput: {[key: string]: string} = {
    bigint: "number",
    text: "text",
    boolean: "checkbox",
    int8: "number",
    numeric: "number",
    timestampz: "datetime-local",
    uuid: "text"
  };

  return schemaTypeToHTMLInput[schemaType] || 'text'; // default to 'text' if no match
}