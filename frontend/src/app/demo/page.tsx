"use client";

import { Sidebar } from "../components/sidebar";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar/>
      <div className="ml-0 md:ml-20 lg:ml-64 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Demo Page</h1>
        <p className="text-gray-600">
          This is a demo page showing the sidebar component. The sidebar is responsive:
        </p>
        <ul className="mt-4 list-disc list-inside text-gray-600 space-y-2">
          <li>On mobile: Hidden by default, can be opened with the menu button</li>
          <li>On tablet: Shows as a narrow sidebar with icons only</li>
          <li>On desktop: Shows as a full sidebar with icons and labels</li>
        </ul>
        
        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Available Roles</h2>
          <p className="text-sm text-gray-600 mb-4">
            You can test different roles by changing the role prop:
          </p>
          <ul className="space-y-1 text-sm">
            <li><code className="bg-gray-100 px-2 py-1 rounded">role="student"</code> - Shows student navigation</li>
            <li><code className="bg-gray-100 px-2 py-1 rounded">role="mentor"</code> - Shows mentor navigation</li>
            <li><code className="bg-gray-100 px-2 py-1 rounded">role="admin"</code> - Shows admin navigation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
