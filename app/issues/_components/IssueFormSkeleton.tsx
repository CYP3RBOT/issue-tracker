import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const IssueFormSkeleton = () => {
  return (
    <Box>
      <Skeleton height="2rem" width="35rem" />
      <Skeleton height="20rem" width="35rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
