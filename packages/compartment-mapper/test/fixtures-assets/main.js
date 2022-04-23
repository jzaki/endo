import text from './text.text';
import bytes from './bytes.bytes';
import uint32 from './uint32.uint32';

// We normalize the module because Windows.
// We normalize the string because editors don't always recognize
// multi-codepoint glyphs and some padding before the quote doesn't hurt.
if (text.trim() !== '🙂    '.trim()) {
  throw new Error(
    `Text module should export default string, got ${JSON.stringify(text)}`,
  );
}

if (!(bytes instanceof ArrayBuffer)) {
  throw new Error('Binary module should export default ArrayBuffer');
}

if (new TextDecoder().decode(bytes) !== 'Hello\n') {
  throw new Error('Binary module should export default ArrayBuffer');
}

const data = new DataView(uint32);
const n = data.getUint32(0, false);
if (n !== 1) {
  throw new Error('Bytes parser for "uint32" should be recognized');
}
