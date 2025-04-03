
import { Card, CardContent } from "@/components/ui/card";

export function EmptyConversationPlaceholder() {
  return (
    <Card className="md:col-span-2">
      <CardContent className="p-0">
        <div className="flex items-center justify-center h-[600px] text-muted-foreground">
          Select a conversation to start messaging
        </div>
      </CardContent>
    </Card>
  );
}
