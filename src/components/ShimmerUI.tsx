

const ShimmerUI = () => {
  return (
    <div className="w-2xl bg-slate-700 mx-auto rounded p-4 space-y-4 animate-pulse">
        {/* Header shimmer */}
        <div className="flex justify-between items-center">
            <div className="h-5 w-24 bg-gray-600 rounded"></div>
            <div className="flex gap-2">
                <div className="h-6 w-10 bg-gray-600 rounded"></div>
                <div className="h-6 w-12 bg-gray-600 rounded"></div>
                <div className="h-6 w-20 bg-gray-600 rounded"></div>
            </div>
        </div>            

        {/* Todo item shimmer */}
        <div className="space-y-3 mt-4">
            {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="h-10 w-full bg-gray-600 rounded" ></div>
            ))}
        </div>
    </div>
  )
}




export default ShimmerUI;