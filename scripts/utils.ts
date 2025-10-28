// Helper function to convert data to proper TS object syntax
export function toTsObject(data: any, indent: number = 2): string {
  if (data instanceof Date) {
    return `new Date('${data.toISOString()}')`;
  }
  if (Array.isArray(data)) {
    if (data.length === 0) return '[]';
    return `[\n${data.map((item) => ' '.repeat(indent) + toTsObject(item, indent + 2)).join(',\n')}\n${' '.repeat(indent - 2)}]`;
  }
  if (typeof data === 'object' && data !== null) {
    const entries = Object.entries(data);
    if (entries.length === 0) return '{}';
    return `{\n${entries
      .map(([key, value]) => `${' '.repeat(indent)}${key}: ${toTsObject(value, indent + 2)}`)
      .join(',\n')}\n${' '.repeat(indent - 2)}}`;
  }
  if (typeof data === 'string') {
    // Escape single quotes and preserve newlines
    const escaped = data.replace(/'/g, "\\'").replace(/\n/g, '\\n');
    return `'${escaped}'`;
  }
  if (typeof data === 'number') {
    return data.toString();
  }
  if (typeof data === 'boolean') {
    return data ? 'true' : 'false';
  }
  if (typeof data === 'undefined') {
    return `undefined`;
  }
  return 'null';
}
