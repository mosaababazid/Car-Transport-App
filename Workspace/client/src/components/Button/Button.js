import "./Button.css";

export default function Button({ variant = "primary", children, ...props }) {
  const className = [
    "ui-button",
    variant === "ghost" ? "ui-button--ghost" : "ui-button--primary",
    props.className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={props.type ?? "button"} {...props} className={className}>
      {children}
    </button>
  );
}
