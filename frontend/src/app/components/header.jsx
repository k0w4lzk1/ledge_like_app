import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { 
  Menu, 
  Search, 
  Bell, 
} from 'lucide-react';


function Header() {
  return (
    <div className="bg-white shadow-sm border-b border-gray-100 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Menu className="w-6 h-6 text-gray-500 md:hidden" />
          <div className="relative hidden md:block">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search now"
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-gray-500">Today ({new Date().toLocaleDateString()})</div>
          </div>
          <Bell className="w-6 h-6 text-gray-500 cursor-pointer" />
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export { Header };