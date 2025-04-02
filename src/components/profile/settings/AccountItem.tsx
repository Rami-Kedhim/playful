
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface AccountItemProps {
  title: string;
  subtitle: string;
  actionLabel: string;
  onAction: () => void;
}

const AccountItem = ({ title, subtitle, actionLabel, onAction }: AccountItemProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      </div>
    </div>
  );
};

export default AccountItem;
