export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center mb-4">
      <span
        className="inline-flex items-center font-semibold uppercase"
        style={{
          backgroundColor: "#f1f5f9",
          border: "1px solid #e2e8f0",
          color: "#0f2050",
          fontSize: 11,
          letterSpacing: "1.5px",
          borderRadius: 9999,
          padding: "5px 14px",
        }}
      >
        {children}
      </span>
    </div>
  );
}
