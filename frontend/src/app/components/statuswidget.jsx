function StatusWidget() {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 relative overflow-hidden">
      {/* Decorative illustration area */}
      <div className="absolute right-0 top-0 w-64 h-32 opacity-20">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <circle cx="40" cy="60" r="15" fill="#4F46E5" />
          <circle cx="80" cy="40" r="12" fill="#7C3AED" />
          <circle cx="120" cy="70" r="18" fill="#EC4899" />
          <circle cx="160" cy="50" r="14" fill="#06B6D4" />
        </svg>
      </div>
      
      <div className="flex items-center justify-between relative z-10">
        <div>
          <div className="flex items-center text-4xl font-bold text-gray-800 mb-2">
            <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mr-4">
              ✓
            </div>
            Active
          </div>
          <div className="text-gray-600">
            <div className="font-semibold">System Status</div>
            <div className="text-sm">All systems operational</div>
          </div>
        </div>
      </div>
    </div>
  );
}




export { StatusWidget };