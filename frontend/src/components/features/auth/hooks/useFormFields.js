import { useEffect, useState } from "react";

export default function useFormFields(action) {
  const [formFields, setFormFields] = useState({
    email: {},
    password: {},
  });

  useEffect(() => {
    switch (action) {
      case "login":
        setFormFields({
          email: { label: "Email", type: "email", name: "email" },
          password: { label: "Password", type: "password", name: "password" },
        });
        break;
      case "register":
        setFormFields({
          name: { label: "Name", type: "text", name: "name" },
          email: { label: "Email", type: "email", name: "email" },
          password: { label: "Password", type: "password", name: "password" },
        });
        break;
    }
  }, [action]);

  return {formFields};
}