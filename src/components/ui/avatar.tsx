import { cn, getInitials } from "@/src/lib/utils";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className={cn(
          "rounded-full object-cover",
          sizeStyles[size],
          className
        )}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700",
        sizeStyles[size],
        className
      )}
      aria-label={name}
    >
      {getInitials(name)}
    </span>
  );
}
