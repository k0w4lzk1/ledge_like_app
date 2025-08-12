  // Simple utility function to conditionally join class names
  function cn(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  export function DashboardCard({ title, value, className = "" }) {
    return (
      <div
        className={cn(
          "bg-sidebar-bg rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-200",
          className
        )}
      >
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-700 mb-3 leading-tight">
            {title}
          </h3>
          <div className="text-2xl font-bold text-gray-900">
            {value}
          </div>
        </div>
      </div>
    );
  }
