import React from 'react';
import { createRoot } from 'react-dom/client';
import Wrapper from '@shared/components/Wrapper';
import DemoPage from '@shared/components/DemoPage';
import promisesDiagram from '@shared/images/promises.png';
import MarkdownNote from '@shared/components/MarkdownNote';
import ExternalLink from '@shared/components/ExternalLink';
import statesAndFates from './content/statesAndFates.md?raw';
import definitionExampleNotes from './content/definitionExampleNotes.md?raw';
import CodeSample from '@shared/components/CodeSample';
import definitionExample from './content/definitionExample.js?raw';
import '@sass/docs.scss';

function AsynchronicityDocs() {
  return (
    <DemoPage title='Asynchronicity'>
      <h2 className='Full'>Promises</h2>
      <ExternalLink
        className='Full'
        label='domenic/promises-unwrapping — states-and-fates.md'
        href='https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md?plain=1'
      />
      <MarkdownNote className='Full DocNotes' headingOffset={2}>
        {statesAndFates}
      </MarkdownNote>
      <img
        className='Full DocImage'
        src={promisesDiagram}
        alt='Promise flow: a pending promise fulfills to .then(onFulfillment) or rejects to .catch(onRejection), each returning a new pending promise for further chaining.'
      />
      <ExternalLink
        className='Full'
        label='MDN'
        href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise'
      />
      <h2 className='Full'>How this relates to Definitions</h2>
      <CodeSample
        className='Half'
        code={definitionExample}
        label='definitionExample.js'
      />
      <MarkdownNote className='Half DocNotes MatchHeight' headingOffset={2}>
        {definitionExampleNotes}
      </MarkdownNote>
    </DemoPage>
  );
}

createRoot(document.getElementById('root')).render(
  <Wrapper>
    <AsynchronicityDocs />
  </Wrapper>,
);
