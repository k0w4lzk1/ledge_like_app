  // Simple utility function to conditionally join class names
 import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { 
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
 
  function cn(...classes) {
    return classes.filter(Boolean).join(' ');
  }

function DashboardCard({ title, value, subtitle, className = "", color = "blue", icon: IconComponent, trend }) {
  const colorClasses = {
    blue: "from-blue-400 to-blue-600",
    purple: "from-purple-500 to-indigo-600", 
    coral: "from-pink-400 to-red-500",
    lightBlue: "from-blue-300 to-blue-500",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600"
  };

  return (
    <div className={`bg-gradient-to-r ${colorClasses[color]} rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-all duration-200 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium opacity-90 mb-2 leading-tight">{title}</h3>
          <div className="text-2xl font-bold mb-1">{value}</div>
          {subtitle && <div className="text-xs opacity-75">{subtitle}</div>}
        </div>
        {IconComponent && (
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <IconComponent className="w-6 h-6" />
          </div>
        )}
      </div>
      {trend && (
        <div className="flex items-center mt-3 text-xs opacity-90">
          {trend.direction === 'up' ? 
            <ArrowUpRight className="w-3 h-3 mr-1" /> : 
            <ArrowDownRight className="w-3 h-3 mr-1" />
          }
          {trend.value}
        </div>
      )}
    </div>
  );
}

export { DashboardCard };