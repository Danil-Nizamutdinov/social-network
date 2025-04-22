import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const usePagination = (fetchData: any, dataKey: string) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const { data, isLoading, isFetching } = fetchData({ page });

  useEffect(() => {
    if (!data || isFetching) return;

    const newItems = data[dataKey] || [];
    setItems((prev: any) => [...prev, ...newItems]);
    setHasMore(page < data.totalPages);
  }, [data, page, isFetching, dataKey]);

  useEffect(() => {
    if (inView && !isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView, isFetching, hasMore]);

  return {
    items,
    isLoading,
    isFetching,
    hasMore,
    observerRef: ref,
    page,
  };
};

export default usePagination;
