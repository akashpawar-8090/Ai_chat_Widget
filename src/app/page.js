import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-6">
          AI Chat Widget SaaS
        </h1>

        <p className="text-xl text-gray-600 mb-10">
          Create AI chatbots for your website
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="border px-6 py-3 rounded-xl"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}