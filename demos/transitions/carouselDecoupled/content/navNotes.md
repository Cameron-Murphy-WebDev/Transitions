In this version of the carousel the buttons are excluded and instead supplied by the caller. I don't want to have state or functions coupled so instead a `requested` prop was created.

The caller sends a request, this is completely one way, the caller does not know how that request is handled. What comes back is a separate channel — `onChange` — so the caller learns which slide the carousel settled on without ever reaching into it.
