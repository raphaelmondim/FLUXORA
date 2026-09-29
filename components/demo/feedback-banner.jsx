import { CheckCircle2, X } from "lucide-react";

export function FeedbackBanner({ message, onClose }) {
  if (!message) return null;
  return (
    <div role="status" className="flex items-start justify-between gap-3 rounded-2xl bg-state-normal/10 px-4 py-3 text-sm text-state-normal">
      <div className="flex items-start gap-2.5">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
        <p>{message}</p>
      </div>
      <button type="button" onClick={onClose} aria-label="Fechar aviso" className="opacity-70 hover:opacity-100">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}