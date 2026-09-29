import { Circle } from "lucide-react";
import { Badge } from "@/components/ui";
import { SITUACAO_LABEL } from "@/lib/helpers";
import { BADGE_VARIANTE } from "@/lib/demo-constants";

export function SituacaoBadge({ situacao }) {
  return (
    <Badge variant={BADGE_VARIANTE[situacao]} className="rounded-full">
      <Circle className="h-2 w-2 fill-current" />
      {SITUACAO_LABEL[situacao]}
    </Badge>
  );
} 