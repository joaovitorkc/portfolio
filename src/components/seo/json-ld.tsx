/**
 * Emits a JSON-LD graph.
 *
 * `<` is escaped so a stray angle bracket in content can never break out of the
 * script element — the standard hardening for inline JSON-LD.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
