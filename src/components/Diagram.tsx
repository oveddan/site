import dynamic from 'next/dynamic';

/**
 * A Mermaid diagram, rendered on the client only.
 *
 * mdx-mermaid's component server-renders the chart source as text inside `div.mermaid`, and on
 * the client Mermaid (`startOnLoad: true`) replaces that text with an SVG before React hydrates,
 * so a server-rendered page always hydrates with a text mismatch. Skipping SSR removes the
 * mismatch; the diagram appears once the page is interactive.
 *
 * Use this instead of a ```mermaid fence: the remark plugin emits a lowercase `<mermaid>` element
 * that nothing on this site maps to a component, so fences render as an unknown tag.
 */
export const Diagram = dynamic(() => import('mdx-mermaid/lib/Mermaid').then((m) => m.Mermaid), {
  ssr: false,
});
