import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import jsx from '@shikijs/langs/jsx';
import scss from '@shikijs/langs/scss';
import darkPlus from '@shikijs/themes/dark-plus';

// dark-plus is VS Code's own Dark+ theme and these are the same TextMate
// grammars the editor parses with, so a panel tokenises exactly the way the
// file does in the editor. Grammars and themes are imported by name rather than
// pulled from shiki's full bundle — that bundle carries every language it ships
// with, and this demo only ever shows two.
export const THEME = 'dark-plus';

const LANGS = { jsx, scss };

// Building a highlighter parses every grammar, so it happens once for the whole
// app and the promise is what callers share — panels mounting together await the
// same build instead of each starting their own.
let building;

export function getHighlighter() {
  building ??= createHighlighterCore({
    langs: Object.values(LANGS),
    themes: [darkPlus],
    // The JS regex engine rather than the Oniguruma one: same output for these
    // two grammars, and no wasm binary to load at runtime.
    engine: createJavaScriptRegexEngine(),
  });

  return building;
}

// Highlighting an unloaded language throws, so callers check first and fall back
// to plain text rather than losing the panel.
export function isSupported(lang) {
  return Object.hasOwn(LANGS, lang);
}
