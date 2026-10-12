# Troubleshooting Editor → Front-End Data Flow

## Code editor view

On the node edit page, open the **⋮** (Options) menu in the top-right toolbar →
**Editor** → **Code editor** (**Cmd+Shift+Option+M**). It shows the raw
`<!-- wp:... -->` block comments that get saved to the body field, including
unsaved edits. **Exit code editor** switches back.

## Checking the PHP output

In dev tools **Elements**, find `#mainReactNode` and its
`data-gutenberg-blocks` attribute. If that JSON has the resolved fields
(`quote`, `author`, `imageURL`, etc.), the PHP worked and anything still wrong
is in the front-end JS (parser `case` or component). Run `drush cr` first,
since Drupal may be serving a cached page from before a PHP change.
