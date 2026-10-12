# Gutenberg Block Data Flow

## 1. Save: data, not markup

Clicking Save renders nothing. Drupal stores the block's attributes as JSON
inside HTML comment delimiters in the node's body field:

```html
<!-- wp:reyrey-js/button {"href":"/x","color":"blue"} /-->
```

- **Dynamic blocks** save only the comment (or an empty wrapper). The real
  markup is produced later from the attributes.
- **Container blocks** (section, column) save `<InnerBlocks.Content />`, so
  their children's comments are nested inside the parent's.
- The comments never reach the browser. On view,
  `reyrey_gutenberg_node_view_alter()` parses the stored body into a block tree
  and hands it to the page as JSON (`data-blocks`).
- The rendered output is cached by Drupal. Blocks that reference entities need
  cache tags (`set_entity_gutenberg_cache()`) or edits to those entities won't
  show.

## 2. One block, three renderers

- **Editor**: `<Name>.definition.js` → `edit`, registered by `editor.js`.
  Runs when the author opens the node edit form.
- **Server fallback**: `dynamic-blocks` in `<theme>.gutenberg.yml` plus a Twig
  template. Runs when a visitor's request hits Drupal.
- **Live page**: the block's `case` in `GutenbergBlockParser`. Runs when the
  browser executes JS and a Drupal behavior reads the JSON.

Notes:

- The editor's `edit` renders the real front-end component, so the preview
  matches the live page. Sidebar controls write values with `setAttributes`.
- The Twig output is what's in the HTML until React replaces it, and what a
  no-JS client sees.
- Before the JSON is sent, `process_custom_gutenberg_block()` (PHP) resolves
  entity IDs into renderable data.

**Adding an attribute touches:** the definition's `attributes` schema plus a
control, the parser `case`, the Twig template if the fallback uses it, and the
PHP processing if it's an entity reference. Changing saved markup also needs a
`deprecated` entry. An attribute missing from the schema is silently dropped on
save.

## 3. IDs vs. cached values

Picking an image saves `mid`, `imageURL`, and `imageAlt`.

- `mid` is the source of truth, a stable reference to the media entity.
- `imageURL`/`imageAlt` are copies taken when the image was picked, saved so
  the editor preview doesn't need another async `getImageInfo()` call.
- They go stale if the media is edited later. Nothing updates them until an
  author picks the image again.
- Fix: resolve from `mid` at render time in PHP, and tag the page with
  `media:<id>` so the cache clears when that media changes.

Rule: attributes store IDs, and fetched content stays in render-time state.
The image copy is a deliberate exception.
