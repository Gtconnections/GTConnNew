/**
 * Inyecta datos estructurados JSON-LD. Acepta uno o varios objetos schema.
 * Server component: se renderiza en el HTML para que lo lean los buscadores.
 */
export default function JsonLd({ schema }: { schema: Record<string, unknown> | Record<string, unknown>[] }) {
  const items = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // El contenido es data controlada por nosotros (no input de usuario).
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
