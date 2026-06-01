/** Strip markdown/HTML and return first N characters of clean text */
export function snippet(content: string, max = 140): string {
  const text = content
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/#{1,6}\s+/g, '')
    .replace(/[*_`~>]/g, '')
    .replace(/\n+/g, ' ')
    .trim()
  if (text.length <= max) return text
  return text.slice(0, max).replace(/\s\S*$/, '') + '…'
}
