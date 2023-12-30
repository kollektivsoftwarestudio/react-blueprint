import React from "react";
import { useDisclosure } from "../../hooks/use-disclosure";
import { Drawer, DrawerProps } from "../../overlay/drawer";
import { Button } from "../button";

type FormDrawerProps = {
  triggerButton: React.ReactElement;
  submitButton: React.ReactElement;
  title: string;
  children: ({ close }: { close: () => void }) => React.ReactNode;
  size?: DrawerProps["size"];
};

export const FormDrawer = ({
  title,
  children,
  triggerButton,
  submitButton,
  size = "md",
}: FormDrawerProps) => {
  const { close, open, isOpen } = useDisclosure();

  return (
    <>
      {React.cloneElement(triggerButton, { onClick: open })}
      <Drawer
        isOpen={isOpen}
        onClose={close}
        title={title}
        size={size}
        renderFooter={() => (
          <>
            <Button variant="inverse" size="sm" onClick={close}>
              Cancel
            </Button>
            {submitButton}
          </>
        )}
      >
        {isOpen && children({ close })}
      </Drawer>
    </>
  );
};
