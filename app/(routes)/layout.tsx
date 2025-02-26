"use client";
import React, { useState } from "react";
import Navbar from "./_components/Navbar";
import FilteredTours from "./_components/FilteredTours";
import { Tour, tours } from "@/constans/index";

const RouterLayout = ({ children }: { children: React.ReactNode }) => {
  const [filteredData, setFilteredData] = useState<Tour[]>(tours);

  return (
    <div>
      <Navbar setFilteredData={setFilteredData} />
      <FilteredTours filteredData={filteredData} />
      {children}
    </div>
  );
};

export default RouterLayout;
