"use client";

import { useState } from "react";
import { Sidebar } from "../../components/sidebar";
import FlexibleTable from "../../components/FlexibleTable";

export default function TodaysProfit() {
  // Sample data matching the screenshot
  const profitData = [
    { "#": 1, "User Name": "ANVER", "Address Book Entries": 25, "Total Charge": "613.55" },
    { "#": 2, "User Name": "KDV", "Address Book Entries": 88, "Total Charge": "1,609.76" },
    { "#": 3, "User Name": "KDV222@GMAIL.COM", "Address Book Entries": 100, "Total Charge": "1,402.10" },
    { "#": 4, "User Name": "SAFVAN2580", "Address Book Entries": 725, "Total Charge": "16,916.92" },
    { "#": 5, "User Name": "KDV444@GMAIL.COM", "Address Book Entries": 83, "Total Charge": "1,671.50" },
    { "#": 6, "User Name": "TEST_USER_1", "Address Book Entries": 45, "Total Charge": "892.33" },
    { "#": 7, "User Name": "TEST_USER_2", "Address Book Entries": 67, "Total Charge": "1,234.56" },
    { "#": 8, "User Name": "TEST_USER_3", "Address Book Entries": 123, "Total Charge": "2,456.78" },
    { "#": 9, "User Name": "TEST_USER_4", "Address Book Entries": 89, "Total Charge": "1,789.90" },
    { "#": 10, "User Name": "TEST_USER_5", "Address Book Entries": 156, "Total Charge": "3,127.45" },
    { "#": 11, "User Name": "TEST_USER_6", "Address Book Entries": 234, "Total Charge": "4,678.23" },
    { "#": 12, "User Name": "TEST_USER_7", "Address Book Entries": 78, "Total Charge": "1,567.89" },
    { "#": 13, "User Name": "TEST_USER_8", "Address Book Entries": 345, "Total Charge": "6,789.12" },
    { "#": 14, "User Name": "TEST_USER_9", "Address Book Entries": 456, "Total Charge": "9,123.45" },
    { "#": 15, "User Name": "TEST_USER_10", "Address Book Entries": 567, "Total Charge": "11,345.67" },
    { "#": 16, "User Name": "TEST_USER_11", "Address Book Entries": 678, "Total Charge": "13,456.78" },
    { "#": 17, "User Name": "TEST_USER_12", "Address Book Entries": 789, "Total Charge": "15,678.90" },
    { "#": 18, "User Name": "TEST_USER_13", "Address Book Entries": 890, "Total Charge": "17,890.12" },
    { "#": 19, "User Name": "TEST_USER_14", "Address Book Entries": 123, "Total Charge": "2,456.78" },
    { "#": 20, "User Name": "TEST_USER_15", "Address Book Entries": 234, "Total Charge": "4,678.90" },
    { "#": 21, "User Name": "TEST_USER_16", "Address Book Entries": 345, "Total Charge": "6,890.12" },
    { "#": 22, "User Name": "TEST_USER_17", "Address Book Entries": 456, "Total Charge": "9,012.34" },
    { "#": 23, "User Name": "TEST_USER_18", "Address Book Entries": 567, "Total Charge": "11,234.56" },
    { "#": 24, "User Name": "TEST_USER_19", "Address Book Entries": 678, "Total Charge": "13,456.78" },
    { "#": 25, "User Name": "TEST_USER_20", "Address Book Entries": 789, "Total Charge": "15,678.90" }
  ];

  const columns = ["#", "User Name", "Address Book Entries", "Total Charge"];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar role="admin" />
      <div className="ml-64 md:ml-20 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Today's Profit Overview</h1>
          
          <FlexibleTable
            heading="Today's Profit Overview"
            columns={columns}
            data={profitData}
            showSearch={true}
            showEntriesSelector={true}
          />
        </div>
      </div>
    </div>
  );
}