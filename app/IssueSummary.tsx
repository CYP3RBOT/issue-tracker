import prisma from "@/prisma/db";
import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  data: {
    open: number;
    inProgress: number;
    closed: number;
  };
}

const IssueSummary = ({ data }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open", value: data.open, status: "OPEN" },
    { label: "In Progress", value: data.inProgress, status: "IN_PROGRESS" },
    { label: "Closed", value: data.closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              href={`/issues/list?status=${container.status}`}
              className="text-sm font-medium"
            >
              {container.label + " Issues"}
            </Link>
            <Text className="font-bold" size="5">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
