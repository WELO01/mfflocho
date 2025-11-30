export const validators: Record<
  string,
  ((value: string) => boolean) & { message: string }
> = {
  email: Object.assign(
    (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    { message: "validator.emailInvalid" }
  ),
  phone: Object.assign(
    (v: string) => /^[0-9]{8,15}$/.test(v),
    { message: "validator.phoneInvalid" }
  ),
  strongPassword: Object.assign(
    (v: string) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(v),
    { message: "validator.passwordWeak" }
  ),
  name: Object.assign(
    (v: string) => /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/.test(v.trim()),
    { message: "validator.nameInvalid" }
  ),
};
