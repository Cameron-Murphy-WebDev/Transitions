import React from 'react';
import { createRoot } from 'react-dom/client';
import Wrapper from '@shared/components/Wrapper';
import DemoPage from '@shared/components/DemoPage';
import MarkdownNote from '@shared/components/MarkdownNote';
import overview from './content/overview.md?raw';
import wrapperProblem from './content/wrapperProblem.md?raw';
import troubleshootingDataFlow from './content/troubleshootingDataFlow.md?raw';
import dataFlowDiagram from './content/dataFlow.svg';
import '@sass/docs.scss';

function DrupalDocs() {
  return (
    <DemoPage title='Drupal'>
      <img
        className='Full DocImage'
        src={dataFlowDiagram}
        alt='Gutenberg block data flow: the editor saves attributes as comments into the Drupal database, which the edit form reads back. On a visitor request, Drupal PHP parses the body and resolves media IDs to current data, emits the block tree as JSON plus Twig fallback markup in the page HTML, and a Drupal behavior hands the JSON to React to mount the blocks.'
      />
      <MarkdownNote className='Full DocNotes' headingOffset={2}>
        {overview}
      </MarkdownNote>
      <MarkdownNote className='Full DocNotes LongForm' headingOffset={2}>
        {wrapperProblem}
      </MarkdownNote>
      <MarkdownNote className='Full DocNotes' headingOffset={2}>
        {troubleshootingDataFlow}
      </MarkdownNote>
    </DemoPage>
  );
}

createRoot(document.getElementById('root')).render(
  <Wrapper>
    <DrupalDocs />
  </Wrapper>,
);
