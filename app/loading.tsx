export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="rounded-3xl bg-white p-10 shadow-xl text-center">
        <div className="h-12 w-12 mx-auto mb-5 rounded-full border-4 border-gray-200 border-t-black animate-spin"></div>
        <p className="text-lg font-semibold text-gray-700">Chargement de la boutique...</p>
      </div>
    </main>
  )
}
