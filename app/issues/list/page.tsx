import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/db";
import { Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: Promise<{ status: Status, orderBy: keyof Issue, sort: 'asc' | 'desc' }>;
}

const IssuesPage = async ({ searchParams: searchParamsPromise }: Props) => {
  const searchParams = (await searchParamsPromise);

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  
  const columns: { 
    label: string;
    value: keyof Issue;
    className?: string;
    }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ]

  const orderBy = columns.map(column => column.value).includes(searchParams.orderBy) ? 
  { [searchParams.orderBy]: (searchParams.sort === 'asc' || searchParams.sort === 'desc' ? searchParams.sort : 'asc') } : undefined;

  const issues = await prisma.issue.findMany({
    where: {status},
    orderBy
  });
  
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            { columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <Link href={{
                  query: { ...searchParams, orderBy: column.value, sort: searchParams.orderBy === column.value && searchParams.sort === 'asc' ? 'desc' : 'asc' }
                }}>
                  { column.label }
                </Link>
                {column.value === searchParams.orderBy && (searchParams.sort === 'asc' ? <ArrowUpIcon className='inline' /> : <ArrowDownIcon className='inline'/> ) }
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
