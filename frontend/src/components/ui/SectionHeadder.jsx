
export default function SectionHeader({ title, description, action }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-base font-semibold text-[#202824]">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-[#777B75]">{description}</p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}
