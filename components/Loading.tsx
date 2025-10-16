export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-pink-100"></div>
        <div className="w-16 h-16 rounded-full border-4 border-pink-500 border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  )
}


