import Axios, { AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = Axios.create({
  baseURL: "http://localhost:6969",
});

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const body = config.data?.data ? config.data.data : config.data;
  const promise = AXIOS_INSTANCE({
    ...config,
    data: body,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  promise.cancel = () => {
    source.cancel("Query was cancelled by Vue Query");
  };

  return promise;
};

export default customInstance;
