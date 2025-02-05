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
  ApiResponseDto,
  ChangePasswordDto,
  LoginDto,
  SignupDto,
} from "../../model";
import { customInstance } from "../../mutator/custom-instance";

export const authControllerLogin = (loginDto: LoginDto) => {
  return customInstance<void>({
    url: `/auth/login`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: loginDto,
  });
};

export const getAuthControllerLoginMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogin>>,
    TError,
    { data: LoginDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerLogin>>,
  TError,
  { data: LoginDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerLogin>>,
    { data: LoginDto }
  > = (props) => {
    const { data } = props ?? {};

    return authControllerLogin(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthControllerLoginMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerLogin>>
>;
export type AuthControllerLoginMutationBody = LoginDto;
export type AuthControllerLoginMutationError = unknown;

export const useAuthControllerLogin = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogin>>,
    TError,
    { data: LoginDto },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof authControllerLogin>>,
  TError,
  { data: LoginDto },
  TContext
> => {
  const mutationOptions = getAuthControllerLoginMutationOptions(options);

  return useMutation(mutationOptions);
};
export const authControllerGetProfile = (signal?: AbortSignal) => {
  return customInstance<ApiResponseDto>({
    url: `/auth/me`,
    method: "GET",
    signal,
  });
};

export const getAuthControllerGetProfileQueryKey = () => {
  return [`/auth/me`] as const;
};

export const getAuthControllerGetProfileQueryOptions = <
  TData = Awaited<ReturnType<typeof authControllerGetProfile>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof authControllerGetProfile>>,
      TError,
      TData
    >
  >;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getAuthControllerGetProfileQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof authControllerGetProfile>>
  > = ({ signal }) => authControllerGetProfile(signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof authControllerGetProfile>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AuthControllerGetProfileQueryResult = NonNullable<
  Awaited<ReturnType<typeof authControllerGetProfile>>
>;
export type AuthControllerGetProfileQueryError = unknown;

export function useAuthControllerGetProfile<
  TData = Awaited<ReturnType<typeof authControllerGetProfile>>,
  TError = unknown,
>(options: {
  query: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof authControllerGetProfile>>,
      TError,
      TData
    >
  > &
    Pick<
      DefinedInitialDataOptions<
        Awaited<ReturnType<typeof authControllerGetProfile>>,
        TError,
        TData
      >,
      "initialData"
    >;
}): DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useAuthControllerGetProfile<
  TData = Awaited<ReturnType<typeof authControllerGetProfile>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof authControllerGetProfile>>,
      TError,
      TData
    >
  > &
    Pick<
      UndefinedInitialDataOptions<
        Awaited<ReturnType<typeof authControllerGetProfile>>,
        TError,
        TData
      >,
      "initialData"
    >;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useAuthControllerGetProfile<
  TData = Awaited<ReturnType<typeof authControllerGetProfile>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof authControllerGetProfile>>,
      TError,
      TData
    >
  >;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey };

export function useAuthControllerGetProfile<
  TData = Awaited<ReturnType<typeof authControllerGetProfile>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof authControllerGetProfile>>,
      TError,
      TData
    >
  >;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAuthControllerGetProfileQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const authControllerLogout = () => {
  return customInstance<void>({ url: `/auth/logout`, method: "POST" });
};

export const getAuthControllerLogoutMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogout>>,
    TError,
    void,
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerLogout>>,
  TError,
  void,
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerLogout>>,
    void
  > = () => {
    return authControllerLogout();
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthControllerLogoutMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerLogout>>
>;

export type AuthControllerLogoutMutationError = unknown;

export const useAuthControllerLogout = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogout>>,
    TError,
    void,
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof authControllerLogout>>,
  TError,
  void,
  TContext
> => {
  const mutationOptions = getAuthControllerLogoutMutationOptions(options);

  return useMutation(mutationOptions);
};
export const authControllerSignup = (signupDto: SignupDto) => {
  return customInstance<void>({
    url: `/auth/signup`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: signupDto,
  });
};

export const getAuthControllerSignupMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerSignup>>,
    TError,
    { data: SignupDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerSignup>>,
  TError,
  { data: SignupDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerSignup>>,
    { data: SignupDto }
  > = (props) => {
    const { data } = props ?? {};

    return authControllerSignup(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthControllerSignupMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerSignup>>
>;
export type AuthControllerSignupMutationBody = SignupDto;
export type AuthControllerSignupMutationError = unknown;

export const useAuthControllerSignup = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerSignup>>,
    TError,
    { data: SignupDto },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof authControllerSignup>>,
  TError,
  { data: SignupDto },
  TContext
> => {
  const mutationOptions = getAuthControllerSignupMutationOptions(options);

  return useMutation(mutationOptions);
};
export const authControllerChangePassword = (
  changePasswordDto: ChangePasswordDto,
) => {
  return customInstance<void>({
    url: `/auth/change-password`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: changePasswordDto,
  });
};

export const getAuthControllerChangePasswordMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerChangePassword>>,
    TError,
    { data: ChangePasswordDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerChangePassword>>,
  TError,
  { data: ChangePasswordDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerChangePassword>>,
    { data: ChangePasswordDto }
  > = (props) => {
    const { data } = props ?? {};

    return authControllerChangePassword(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthControllerChangePasswordMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerChangePassword>>
>;
export type AuthControllerChangePasswordMutationBody = ChangePasswordDto;
export type AuthControllerChangePasswordMutationError = unknown;

export const useAuthControllerChangePassword = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerChangePassword>>,
    TError,
    { data: ChangePasswordDto },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof authControllerChangePassword>>,
  TError,
  { data: ChangePasswordDto },
  TContext
> => {
  const mutationOptions =
    getAuthControllerChangePasswordMutationOptions(options);

  return useMutation(mutationOptions);
};
