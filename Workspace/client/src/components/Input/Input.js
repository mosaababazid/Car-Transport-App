import "./Input.css";

export default function Input({ label, id, error, describedBy, ...props }) {
  const errorId = error ? `${id}-error` : undefined;
  const ariaDescribedBy = [describedBy, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={`ui-field ${error ? "ui-field--error" : ""}`}>
      {label && (
        <label className="ui-field-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className={`ui-field-shell ${error ? "ui-field-shell--error" : ""}`}>
        <input
          id={id}
          className="ui-field-input"
          aria-invalid={error ? "true" : undefined}
          aria-describedby={ariaDescribedBy}
          {...props}
        />
      </div>
      {error && (
        <span id={errorId} className="ui-field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
