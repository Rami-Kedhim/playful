
import React from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface FormActionsProps {
  loading: boolean;
}

const FormActions = ({ loading }: FormActionsProps) => {
  return (
    <CardFooter className="flex justify-end gap-2 mt-6">
      <Button variant="outline" type="button" onClick={() => window.history.back()}>
        Cancel
      </Button>
      <Button type="submit" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Changes
      </Button>
    </CardFooter>
  );
};

export default FormActions;
