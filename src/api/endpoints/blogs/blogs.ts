/**
 * Generated by orval v7.1.0 🍺
 * Do not edit manually.
 * VHG Tailor API
 * API documentation
 * OpenAPI spec version: 1.3
 */
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import type {
  BlogDTO,
  BlogResponseDto,
  BlogsControllerFindNewParams,
  BlogsListResponseDto,
} from "../../model";
import { customInstance } from "../../mutator/custom-instance";

export const blogsControllerFindAll = (signal?: AbortSignal) => {
  return customInstance<BlogsListResponseDto>({
    url: `/blogs`,
    method: "GET",
    signal,
  });
};

export const getBlogsControllerFindAllQueryKey = () => {
  return [`/blogs`] as const;
};

export const getBlogsControllerFindAllQueryOptions = <
  TData = Awaited<ReturnType<typeof blogsControllerFindAll>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof blogsControllerFindAll>>,
      TError,
      TData
    >
  >;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getBlogsControllerFindAllQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof blogsControllerFindAll>>
  > = ({ signal }) => blogsControllerFindAll(signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof blogsControllerFindAll>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type BlogsControllerFindAllQueryResult = NonNullable<
  Awaited<ReturnType<typeof blogsControllerFindAll>>
>;
export type BlogsControllerFindAllQueryError = unknown;

export function useBlogsControllerFindAll<
  TData = Awaited<ReturnType<typeof blogsControllerFindAll>>,
  TError = unknown,
>(options: {
  query: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof blogsControllerFindAll>>,
      TError,
      TData
    >
  > &
    Pick<
      DefinedInitialDataOptions<
        Awaited<ReturnType<typeof blogsControllerFindAll>>,
        TError,
        TData
      >,
      "initialData"
    >;
}): DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useBlogsControllerFindAll<
  TData = Awaited<ReturnType<typeof blogsControllerFindAll>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof blogsControllerFindAll>>,
      TError,
      TData
    >
  > &
    Pick<
      UndefinedInitialDataOptions<
        Awaited<ReturnType<typeof blogsControllerFindAll>>,
        TError,
        TData
      >,
      "initialData"
    >;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useBlogsControllerFindAll<
  TData = Awaited<ReturnType<typeof blogsControllerFindAll>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof blogsControllerFindAll>>,
      TError,
      TData
    >
  >;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey };

export function useBlogsControllerFindAll<
  TData = Awaited<ReturnType<typeof blogsControllerFindAll>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof blogsControllerFindAll>>,
      TError,
      TData
    >
  >;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getBlogsControllerFindAllQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const blogsControllerCreate = (blogDTO: BlogDTO) => {
  return customInstance<void>({
    url: `/blogs`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: blogDTO,
  });
};

export const getBlogsControllerCreateMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof blogsControllerCreate>>,
    TError,
    { data: BlogDTO },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof blogsControllerCreate>>,
  TError,
  { data: BlogDTO },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof blogsControllerCreate>>,
    { data: BlogDTO }
  > = (props) => {
    const { data } = props ?? {};

    return blogsControllerCreate(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type BlogsControllerCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof blogsControllerCreate>>
>;
export type BlogsControllerCreateMutationBody = BlogDTO;
export type BlogsControllerCreateMutationError = unknown;

export const useBlogsControllerCreate = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof blogsControllerCreate>>,
    TError,
    { data: BlogDTO },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof blogsControllerCreate>>,
  TError,
  { data: BlogDTO },
  TContext
> => {
  const mutationOptions = getBlogsControllerCreateMutationOptions(options);

  return useMutation(mutationOptions);
};
export const blogsControllerFindNew = (
  params?: BlogsControllerFindNewParams,
  signal?: AbortSignal,
) => {
  return customInstance<BlogsListResponseDto>({
    url: `/blogs/new`,
    method: "GET",
    params,
    signal,
  });
};

export const getBlogsControllerFindNewQueryKey = (
  params?: BlogsControllerFindNewParams,
) => {
  return [`/blogs/new`, ...(params ? [params] : [])] as const;
};

export const getBlogsControllerFindNewQueryOptions = <
  TData = Awaited<ReturnType<typeof blogsControllerFindNew>>,
  TError = unknown,
>(
  params?: BlogsControllerFindNewParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof blogsControllerFindNew>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getBlogsControllerFindNewQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof blogsControllerFindNew>>
  > = ({ signal }) => blogsControllerFindNew(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof blogsControllerFindNew>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type BlogsControllerFindNewQueryResult = NonNullable<
  Awaited<ReturnType<typeof blogsControllerFindNew>>
>;
export type BlogsControllerFindNewQueryError = unknown;

export function useBlogsControllerFindNew<
  TData = Awaited<ReturnType<typeof blogsControllerFindNew>>,
  TError = unknown,
>(
  params: undefined | BlogsControllerFindNewParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof blogsControllerFindNew>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof blogsControllerFindNew>>,
          TError,
          TData
        >,
        "initialData"
      >;
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useBlogsControllerFindNew<
  TData = Awaited<ReturnType<typeof blogsControllerFindNew>>,
  TError = unknown,
>(
  params?: BlogsControllerFindNewParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof blogsControllerFindNew>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof blogsControllerFindNew>>,
          TError,
          TData
        >,
        "initialData"
      >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useBlogsControllerFindNew<
  TData = Awaited<ReturnType<typeof blogsControllerFindNew>>,
  TError = unknown,
>(
  params?: BlogsControllerFindNewParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof blogsControllerFindNew>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey };

export function useBlogsControllerFindNew<
  TData = Awaited<ReturnType<typeof blogsControllerFindNew>>,
  TError = unknown,
>(
  params?: BlogsControllerFindNewParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof blogsControllerFindNew>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getBlogsControllerFindNewQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const blogsControllerFindOne = (slug: string, signal?: AbortSignal) => {
  return customInstance<BlogResponseDto>({
    url: `/blogs/detail/${encodeURIComponent(String(slug))}`,
    method: "GET",
    signal,
  });
};

export const getBlogsControllerFindOneQueryKey = (slug: string) => {
  return [`/blogs/detail/${slug}`] as const;
};

export const getBlogsControllerFindOneQueryOptions = <
  TData = Awaited<ReturnType<typeof blogsControllerFindOne>>,
  TError = unknown,
>(
  slug: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof blogsControllerFindOne>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getBlogsControllerFindOneQueryKey(slug);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof blogsControllerFindOne>>
  > = ({ signal }) => blogsControllerFindOne(slug, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!slug,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof blogsControllerFindOne>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type BlogsControllerFindOneQueryResult = NonNullable<
  Awaited<ReturnType<typeof blogsControllerFindOne>>
>;
export type BlogsControllerFindOneQueryError = unknown;

export function useBlogsControllerFindOne<
  TData = Awaited<ReturnType<typeof blogsControllerFindOne>>,
  TError = unknown,
>(
  slug: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof blogsControllerFindOne>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof blogsControllerFindOne>>,
          TError,
          TData
        >,
        "initialData"
      >;
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useBlogsControllerFindOne<
  TData = Awaited<ReturnType<typeof blogsControllerFindOne>>,
  TError = unknown,
>(
  slug: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof blogsControllerFindOne>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof blogsControllerFindOne>>,
          TError,
          TData
        >,
        "initialData"
      >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useBlogsControllerFindOne<
  TData = Awaited<ReturnType<typeof blogsControllerFindOne>>,
  TError = unknown,
>(
  slug: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof blogsControllerFindOne>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey };

export function useBlogsControllerFindOne<
  TData = Awaited<ReturnType<typeof blogsControllerFindOne>>,
  TError = unknown,
>(
  slug: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof blogsControllerFindOne>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getBlogsControllerFindOneQueryOptions(slug, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const blogsControllerUpdate = (slug: string, blogDTO: BlogDTO) => {
  return customInstance<void>({
    url: `/blogs/${encodeURIComponent(String(slug))}`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: blogDTO,
  });
};

export const getBlogsControllerUpdateMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof blogsControllerUpdate>>,
    TError,
    { slug: string; data: BlogDTO },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof blogsControllerUpdate>>,
  TError,
  { slug: string; data: BlogDTO },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof blogsControllerUpdate>>,
    { slug: string; data: BlogDTO }
  > = (props) => {
    const { slug, data } = props ?? {};

    return blogsControllerUpdate(slug, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type BlogsControllerUpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof blogsControllerUpdate>>
>;
export type BlogsControllerUpdateMutationBody = BlogDTO;
export type BlogsControllerUpdateMutationError = unknown;

export const useBlogsControllerUpdate = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof blogsControllerUpdate>>,
    TError,
    { slug: string; data: BlogDTO },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof blogsControllerUpdate>>,
  TError,
  { slug: string; data: BlogDTO },
  TContext
> => {
  const mutationOptions = getBlogsControllerUpdateMutationOptions(options);

  return useMutation(mutationOptions);
};
export const blogsControllerDelete = (slug: string) => {
  return customInstance<void>({
    url: `/blogs/${encodeURIComponent(String(slug))}`,
    method: "DELETE",
  });
};

export const getBlogsControllerDeleteMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof blogsControllerDelete>>,
    TError,
    { slug: string },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof blogsControllerDelete>>,
  TError,
  { slug: string },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof blogsControllerDelete>>,
    { slug: string }
  > = (props) => {
    const { slug } = props ?? {};

    return blogsControllerDelete(slug);
  };

  return { mutationFn, ...mutationOptions };
};

export type BlogsControllerDeleteMutationResult = NonNullable<
  Awaited<ReturnType<typeof blogsControllerDelete>>
>;

export type BlogsControllerDeleteMutationError = unknown;

export const useBlogsControllerDelete = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof blogsControllerDelete>>,
    TError,
    { slug: string },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof blogsControllerDelete>>,
  TError,
  { slug: string },
  TContext
> => {
  const mutationOptions = getBlogsControllerDeleteMutationOptions(options);

  return useMutation(mutationOptions);
};
