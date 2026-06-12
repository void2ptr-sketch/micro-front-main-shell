export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type ChangePasswordFormValue = ChangePasswordPayload & {
  confirmPassword: string;
};

export type ChangePasswordResponse = {
  success: boolean;
  message: string;
};
