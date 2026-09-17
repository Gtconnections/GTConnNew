import Link from "next/link";
import type { ReactNode, AnchorHTMLAttributes } from "react";

type Props = {
  href: string;
  external?: boolean;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/**
 * Renderiza un <Link> de Next para rutas internas y un <a> normal para
 * enlaces externos (GoDaddy, tienda, brief, redes...). Reenvía props extra
 * (className, onMouseEnter, etc.).
 */
export default function SmartLink({ href, external, children, ...rest }: Props) {
  const isExternal = external ?? /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
