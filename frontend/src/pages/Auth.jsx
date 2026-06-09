import AuthFormField from "@/components/features/auth/AuthFormField";
import useFormFields from "@/components/features/auth/hooks/useFormFields";
import useToken from "@/components/features/auth/hooks/useToken";
import AuthLoading from "@/components/features/auth/ui/AuthLoading";
import { handleSubmit } from "@/components/features/auth/utils/handleSubmit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth({ action = "login" }) {
  const navigate = useNavigate();
  const { setToken } = useToken();

  const [isLoading, setIsLoading] = useState(false);
  const [isReceivedData, setIsReceivedData] = useState(true);
  const [formData, setFormData] = useState({});
  const { formFields } = useFormFields(action);
  const [errors, setErrors] = useState(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!action || !formFields) return setIsLoading(true);

    // Initialiser formData avec les champs vides
    const initialData = {};
    Object.values(formFields).forEach(field => {
      initialData[field.name] = "";
    });
    setFormData(initialData);
    setIsLoading(false);
  }, [action, formFields]);

  // Redirection après succès
  useEffect(() => {
    console.log(isValid);

    if (isValid) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000); // 2 secondes de loading avant redirection

      return () => clearTimeout(timer);
    }
  }, [isValid, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const payload = Object.fromEntries(data.entries());
    const { isValid: responseIsValid, errors: responseErrors, token } = await handleSubmit(action, payload, setIsReceivedData, setToken);

    if (responseIsValid && token) {
      console.log(responseIsValid);

      setToken(token); // Stock le token en cookie
      setIsValid(true);
      setErrors(null);
    } else {
      setErrors(responseErrors);
    }
  };

  return isLoading ? (
    <AuthLoading />
  ) : (
    <main className="min-h-screen auth px-12 py-8 flex">
      <div className="min-h-full flex self-center justify-center w-full">
        <div className="w-full max-w-md md:max-w-xl bg-white flex flex-col items-center justify-center rounded-lg shadow-lg p-8">
          <h1 className="mb-6 text-4xl border-b-2 border-[#e47995]">
            {action === "login" ? "Login" : "Register"}
          </h1>
          <form className="w-full max-w-sm md:max-w-md" onSubmit={onSubmit}>
            {Object.values(formFields).map((field) => (
              <AuthFormField
                key={field.name || Math.round(Math.random() * 1000)}
                {...field}
                value={formData[field.name] || ""}
                onChange={handleChange}
                error={errors?.[field.name]}
                isSuccess={isValid}
              />
            ))}
            <button
              type="submit"
              className={`w-full text-white py-2 rounded-lg mt-4 transition-all duration-300 flex items-center justify-center gap-2 ${isValid
                ? "bg-green-500 cursor-default"
                : isReceivedData
                  ? "bg-[#e47995] hover:bg-[#d86585] cursor-pointer"
                  : "bg-[#e47995] opacity-70 cursor-not-allowed"
                }`}
              disabled={!isReceivedData || isValid}
            >
              {isReceivedData ? (
                <>
                  {isValid ? (
                    <>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Authentification réussie
                    </>
                  ) : (
                    action === "login" ? "Login" : "Register"
                  )}
                </>
              ) : (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Traitement en cours...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}