import { useMemo } from "react";

export default function useFormFields(action) {
  const formFields = useMemo(() => {
    switch (action) {
      case "login":
        return {
          email: { label: "Email", type: "email", name: "email" },
          password: { label: "Password", type: "password", name: "password" },
        };

      case "register":
        return {
          name: { label: "Name", type: "text", name: "name" },
          email: { label: "Email", type: "email", name: "email" },
          password: { label: "Password", type: "password", name: "password" },
        };

      default:
        return {};
    }
  }, [action]);

  return { formFields };
}