import "./Input.css";

export default function Input({ label, id, ...props }) {
  return (
    <div className="ui-field">
      {label && (
        <label className="ui-field-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="ui-field-shell">
        <input id={id} className="ui-field-input" {...props} />
      </div>
    </div>
  );
}
