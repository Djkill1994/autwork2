import { Box, Button, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";

export interface IModalWindowProps {
  children: ReactNode;
  isOpened: boolean;
  close: () => void;
  open: () => void;
  buttonText: string;
}

export const ButtonModalWindow = ({
  children,
  isOpened,
  close,
  open,
  buttonText,
}: IModalWindowProps) => {
  return (
    <Box>
      {isOpened && (
        <Modal open={isOpened} onClose={close}>
          <Box
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              p="0 20px 20px 20px"
              width="380px"
              gap="15px"
              alignItems="center"
              justifyContent="center"
              borderRadius="15px"
              bgcolor="#f5f5f5"
            >
              <Box display="flex" justifyContent="flex-end">
                <IconButton edge="end" color="error" onClick={close}>
                  <CloseIcon />
                </IconButton>
              </Box>
              {children}
            </Box>
          </Box>
        </Modal>
      )}
      <Button color="secondary" variant="contained" onClick={open}>
        {buttonText}
      </Button>
    </Box>
  );
};
