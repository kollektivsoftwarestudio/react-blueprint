import {
  QueryClient,
  QueryKey,
  UseBaseQueryOptions,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

export const queryClient = new QueryClient();

export type QueryOptions = Omit<UseBaseQueryOptions, "queryFn" | "queryKey">;

export const useQueryFn = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
): UseQueryResult<TData, TError> => {
  const query = useQuery(options);
  return query;
};

export const useMutationFn = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const mutate = useMutation(options);
  return mutate;
};
