export const APP_NAME = process.env.PUBLIC_NEXT_APP_NAME || "Prostore";
export const APP_DESCRIPTION =
  process.env.PUBLIC_NEXT_APP_DESCRIPTION || "a modern ecommerce platform";

export const APP_URL = process.env.PUBLIC_NEXT_APP_URL || "http:localhost:3000";
export const PRODUCT_LIMIT = process.env.PUBLIC_NEXT_PRODUCT_LIMIT || 4;
export const signInDefaultValue = {
  email: "",
  password: "",
};

export const signUpDefaultValue = {
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
};
