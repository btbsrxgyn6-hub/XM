"use client";

import { LocaleLink } from "@/components/atoms/locale-link";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light" | "ghostLight" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-surface shadow-sm ring-1 ring-primary/10 hover:brightness-95 focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  secondary:
    "bg-surface text-primary shadow-sm ring-1 ring-muted/60 hover:bg-primary/3 focus-visible:ring-2 focus-visible:ring-brand/55 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  light:
    "bg-surface text-primary shadow-sm ring-1 ring-muted/60 hover:bg-primary/3 focus-visible:ring-2 focus-visible:ring-brand/55 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  ghostLight:
    "bg-transparent text-surface ring-1 ring-surface/25 hover:bg-surface/10 focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  ghost:
    "bg-transparent text-primary ring-1 ring-primary/10 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  danger:
    "bg-brand text-primary shadow-sm ring-1 ring-primary/10 hover:brightness-95 focus-visible:ring-2 focus-visible:ring-brand/65 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-base"
};

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
};

type ButtonAsLinkProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    external?: boolean;
  };

type ButtonAsButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

export function Button(props: ButtonProps) {
  const { className, variant = "primary", size = "md", children } = props;

  const styles = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none",
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, external, className: _className, ...rest } = props;
    const isHash = href.startsWith("#");
    const isExternal =
      external || href.startsWith("http://") || href.startsWith("https://");

    if (isHash || isExternal) {
      return (
        <a
          href={href}
          className={styles}
          {...rest}
          {...(isExternal ? { rel: "noreferrer" } : {})}
        >
          {children}
        </a>
      );
    }

    return (
      <LocaleLink href={href} className={styles} {...rest}>
        {children}
      </LocaleLink>
    );
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButtonProps;
  return (
    <button {...buttonProps} className={styles}>
      {children}
    </button>
  );
}
