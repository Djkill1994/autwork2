import { AuthRegistrationForm } from "~/features/Auth/components";
import { useModal } from "~/libs/utils";
import { ButtonModalWindow } from "~/libs/ui-kit";

export const AdminRegistreNewUser = () => {
  const { isOpened, open, close } = useModal();

  return (
    <>
      <ButtonModalWindow
        close={close}
        isOpened={isOpened}
        open={open}
        buttonText={"Зарегистрировать нового пользователя"}
        children={<AuthRegistrationForm close={close} />}
      />
    </>
  );
};
