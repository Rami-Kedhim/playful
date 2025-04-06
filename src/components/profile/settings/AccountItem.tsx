
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AccountItemProps {
  title: string;
  subtitle?: string;
  description?: string;
  actionLabel: string;
  onAction: () => void;
  disabled?: boolean;
}

const AccountItem = ({
  title,
  subtitle,
  description,
  actionLabel,
  onAction,
  disabled = false
}: AccountItemProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex justify-end">
        <Button onClick={onAction} disabled={disabled}>
          {actionLabel}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccountItem;
