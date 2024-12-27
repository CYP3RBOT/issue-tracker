import React from "react";
import Pagination from "./components/Pagination";

const Home = async ({
  searchParams: rawSearchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const searchParams = await rawSearchParams;

  return (
    <div>
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      />
    </div>
  );
};

export default Home;
