import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import { AuthRegistrationForm } from "~/features/Auth/components";

export const AdminRegistreNewUser = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <Box>
      {isModal && (
        <Modal
          open={isModal}
          onClose={() => setIsModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AuthRegistrationForm />
        </Modal>
      )}
      <Button
        color="secondary"
        variant="contained"
        onClick={() => setIsModal(true)}
      >
        Создать нового пользователя
      </Button>
    </Box>
  );
};
