/**
 * This file is to include certain images or CSS files into the bundle. As for plugins,
 * you need to bundle *all* assets due to a relative or absolute path might not work.
 *
 * Currently supported file extensions are: jpeg, jpg, gif, png, woff(2), eot, ttf, svg, css, sass and less
 *
 * If you need more types supported, add them to the d.ts file and add a webpack rule.
 */
import previewImage from './widget-plugin-pr.png';

// this will be a global style -> try to avoid as it could break existing styles
// better use component based styling (see ../widget/widget-plugin.component.css)
import './example.css';

// paths can be shared via this module if needed
export const assetPaths = { previewImage };
