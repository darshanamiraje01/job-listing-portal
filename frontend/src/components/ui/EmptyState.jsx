export default function EmptyState({ icon = "📋", title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
      <div className="text-5xl">{icon}</div>
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      {description && <p className="text-sm text-text-muted max-w-sm">{description}</p>}
      {action}
    </div>
  );
}