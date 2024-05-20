import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface IProps {
  inputProps: OutlinedInputProps;
  error?: string;
  label: string;
  id: string;
}

export const FormInputPassword = ({ inputProps, error, label, id }: IProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormControl color="secondary" variant="outlined" size="small" fullWidth>
      <InputLabel htmlFor={id} error={!!error}>
        {label}
      </InputLabel>
      <OutlinedInput
        {...inputProps}
        id={id}
        type={showPassword ? "text" : "password"}
        error={!!error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              edge="end"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {!!error && (
        <FormHelperText id={id} error>
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};
