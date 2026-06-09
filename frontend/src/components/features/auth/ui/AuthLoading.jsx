export default function AuthLoading() {
  return (
    <main className="min-h-screen auth px-12 py-8 flex">
      <div className="min-h-full flex self-center justify-center w-full">
        <div className="w-full max-w-md md:max-w-xl bg-white rounded-lg shadow-lg p-8 animate-pulse">
          <div className="flex justify-center mb-8">
            <div className="h-10 w-40 rounded bg-pink-200 border-b-2 border-pink-400" />
          </div>

          <div className="space-y-5">
            {[1, 2, 3].map((field) => (
              <div key={field}>
                <div className="h-4 w-24 bg-pink-100 rounded mb-2" />
                <div className="h-11 w-full bg-pink-50 border border-pink-100 rounded-lg" />
              </div>
            ))}

            <div className="h-11 w-full rounded-lg bg-gradient-to-r from-pink-300 via-[#e47995] to-pink-400 mt-6" />
          </div>

          <div className="flex justify-center mt-8 gap-2">
            <span className="w-3 h-3 rounded-full bg-pink-300 animate-bounce" />
            <span
              className="w-3 h-3 rounded-full bg-[#e47995] animate-bounce"
              style={{ animationDelay: "0.15s" }}
            />
            <span
              className="w-3 h-3 rounded-full bg-pink-400 animate-bounce"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}