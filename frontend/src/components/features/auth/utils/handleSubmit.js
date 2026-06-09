import { fetchData } from "@/components/services/Fetch";
import useRequireFields from "../hooks/useRequireFields";

export async function handleSubmit(action, formData, setLoading, setToken) {
  setLoading(false);
  if (!action) return;

  const { isValid, errors } = useRequireFields(action, formData);

  if (Object.values(errors).some((error) => error !== null)) {
    setLoading(true);
    return { isValid, errors };
  }

  const apiUrl = `http://localhost:8000/api/auth/${action}`;

  let data = null;

  try {
    data = await fetchData(apiUrl, {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (data.error) return { isValid: false, errors: { email: data.error.message } };

    if (!data.token) return { isValid: false, errors: { email: `Une erreur c'est produite lors de l'envoie de vos données.` } };

    setToken(data.token);

    return { isValid: true, token: data.token };
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  } finally {
    setLoading(true);
  }
}