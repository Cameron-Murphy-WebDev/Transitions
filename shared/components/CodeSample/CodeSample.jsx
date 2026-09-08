import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import pickRegion from './region';
import { getHighlighter, isSupported, THEME } from './highlighter';
import './CodeSample.scss';

// Read-only source display. Pass the string from a `?raw` import so the panel
// always shows the real file:
//
//   import demoSource from './CarouselDemo.jsx?raw';
//   <CodeSample code={demoSource} label='CarouselDemo.jsx' />
//
// Saving the imported file triggers an HMR reload, so the panel follows the
// source with no copy-paste to keep in sync. Pass `region` to show only the
// lines between that region's markers — see region.js.
export default function CodeSample({
  code,
  label = '',
  lang = 'jsx',
  region = '',
  className = '',
}) {
  const shown = pickRegion(code, region);
  const heading = region && label ? `${label} — ${region}` : label || region;
  const [html, setHtml] = useState('');

  // Shiki builds its highlighter asynchronously, so the panel renders as plain
  // text first and swaps in the marked-up copy when it resolves. `live` guards
  // the setState: the source can change again — or the panel unmount — while an
  // earlier highlight is still in flight.
  useEffect(() => {
    if (!isSupported(lang)) return undefined;

    let live = true;

    getHighlighter().then((highlighter) => {
      if (!live) return;

      setHtml(
        highlighter.codeToHtml(shown, {
          lang,
          theme: THEME,
          // Shiki emits its own <pre><code>; these hand those elements the
          // panel's classes so the height and scroll rules still apply, and
          // keep the pre focusable for keyboard scrolling.
          transformers: [
            {
              pre(node) {
                this.addClassToHast(node, 'CodeSample-Pre');
                node.properties.tabindex = 0;
              },
              code(node) {
                this.addClassToHast(node, 'CodeSample-Code');
              },
            },
          ],
        }),
      );
    });

    return () => {
      live = false;
    };
  }, [shown, lang]);

  return (
    <figure className={`CodeSample ${className}`}>
      {heading && (
        <figcaption className='CodeSample-Label'>{heading}</figcaption>
      )}
      {html ? (
        // display: contents on the wrapper, so Shiki's <pre> sits in the figure
        // as if it were a direct child — React can't set innerHTML on an element
        // that also has the caption as a child.
        <div
          className='CodeSample-Body'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className='CodeSample-Pre' tabIndex={0}>
          <code className={`CodeSample-Code language-${lang}`}>{shown}</code>
        </pre>
      )}
    </figure>
  );
}

CodeSample.propTypes = {
  code: PropTypes.string.isRequired,
  label: PropTypes.string,
  lang: PropTypes.string,
  region: PropTypes.string,
  className: PropTypes.string,
};
