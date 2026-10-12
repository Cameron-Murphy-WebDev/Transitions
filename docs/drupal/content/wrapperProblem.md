# The Wrapper Problem

For **editor-side** component calls that use the **reyrey_gutenberg** module, these are normally written and used the same way as in a site's **theme**, except they import from a different repo. For **wrapper components**, the call for the **RRJS** component is made in a site-specific component, the **wrapper**. This might be done because the component needs **conditional props** that should be added in the codebase but not be accessible through the editor.

For the recent component I've done, a similar issue arose. The data the component needs already exists on each site, and the names of the **data fields** differ by site. Because of these two issues, each site's **theme** has to own the component.

For the **front end** this doesn't cause too much of a problem. The data the front end needs is declared in the **reyrey_gutenberg** module with **PHP**, but can also exist in the **site's module** (site specific). The site module's **PHP** will override the Gutenberg module's in this case.

The **editor** is a little more difficult. The props are conditional, and the editor's data flow uses **JSON:API**. What data is returned depends on the **data-fetching functions** in the **definition**. Unlike with the PHP, creating site-specific **definition files** to override the Gutenberg module's would basically defeat the purpose of having the component be a part of the Gutenberg module to begin with.

We can fix this problem with two solutions. The first is the **window object**, whose **properties** can be seen in the **browser console**. The window object exists in the browser and can hold various data. In the editor, instead of each site registering its own **component definition**, the module **registers** the definition and each site uses the window to supply its own pieces.

First, we need to create our **window slots**. The **ReyreyGutenberg** object already exists on the window, so in the module's definition we add an object for our component to it. We need two slots to fix our problem. The first is the **component slot**, which will be filled by a site's wrapper. The Gutenberg module may have access to the RRJS component, but it does not have access to the **wrapper component** that each site uses. The second is the **variable data**. Both of these are set to **null**, as they are only empty slots that can be filled by each specific theme.

Back in the site's theme, where we would normally register our definition, we fill the component slot with the wrapper component. Our **data object** can be filled with **key-value pairs** that are needed by the Gutenberg module. The **keys** must be uniform, as they match the data the module returns, but the **values** are the actual **machine names** of fields that are unique to each site.

The second solution is the **CustomOptions** component. Because each site's blocks use different settings in the editor (the settings that show up in the **side panel**), we need to handle this conditionally. Instead of hardcoding panels with **ToggleControls** and other **wp** (or **ReyreyGutenberg** helper) components, we can use just the CustomOptions component. This component takes in a **componentName** and a **customClassObject** prop. Using these, it renders panel settings conditionally.

Data is passed to it through Drupal's **admin UI**. In the **Content authoring >> Reyrey Gutenberg Settings** menu, there are component-specific **option sets** that we can add. We can specify what type of wp component they will show and which block menu section they appear under. We can specify which **class** will be added to the component when an option is toggled.
