"use client";

import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import React from "react";

interface Props {
  data: {
    open: number;
    inProgress: number;
    closed: number;
  };
}

const IssueChart = ({ data }: Props) => {
  const chartDetails = [
    { label: "Open", value: data.open },
    { label: "In Progress", value: data.inProgress },
    { label: "Closed", value: data.closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartDetails}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{
              fill: "var(--accent-9)",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
