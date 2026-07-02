import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function LogoutModal({ open, onClose, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          borderRadius: "1rem",
          maxWidth: "24rem",
          width: "100%",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          padding: "1.5rem",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "oklch(0.27 0.08 255)" }}>
            Log out
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              height: "2rem",
              width: "2rem",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              background: "oklch(0.985 0.005 250)",
            }}
          >
            <X style={{ height: "1rem", width: "1rem" }} />
          </button>
        </div>
        <p
          style={{
            fontSize: "0.875rem",
            color: "oklch(0.554 0.046 257.417)",
            marginBottom: "1.5rem",
          }}
        >
          Are you sure you want to log out?
        </p>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              border: "1px solid oklch(0.929 0.013 255.508)",
              color: "oklch(0.20 0.06 250)",
              fontWeight: 600,
              padding: "0.625rem 0",
              borderRadius: "0.75rem",
              cursor: "pointer",
              background: "white",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              flex: 1,
              background: "oklch(0.577 0.245 27.325)",
              color: "white",
              fontWeight: 600,
              padding: "0.625rem 0",
              borderRadius: "0.75rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
