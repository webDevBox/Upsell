import { useAuthenticatedFetch } from "./useAuthenticatedFetch";
import { useMemo } from "react";
import { useQuery,useMutation } from "react-query";
import {useNavigate} from "react-router-dom"


/**
 * A hook for querying your custom app data.
 * @desc A thin wrapper around useAuthenticatedFetch and react-query's useQuery.
 *
 * @param {Object} options - The options for your query. Accepts 3 keys:
 *
 * 1. url: The URL to query. E.g: /api/widgets/1`
 * 2. fetchInit: The init options for fetch.  See: https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters
 * 3. reactQueryOptions: The options for `useQuery`. See: https://react-query.tanstack.com/reference/useQuery
 *
 * @returns Return value of useQuery.  See: https://react-query.tanstack.com/reference/useQuery.
 */
export const useAppQuery = ({ url, fetchInit = {}, reactQueryOptions }) => {
  const authenticatedFetch = useAuthenticatedFetch();
  const fetch = useMemo(() => {
    return async () => {
      const response = await authenticatedFetch(url, fetchInit);
      return response.json();
    };
  }, [url, JSON.stringify(fetchInit)]);

  return useQuery(url, fetch, {
    ...reactQueryOptions,
    refetchOnWindowFocus: false,
  });
};


export const useAppMutation = ({ url, fetchInit = {}, reactQueryOptions, route }) => {
  const navigate = useNavigate();

  const authenticatedFetch = useAuthenticatedFetch();
  const mutation = useMemo(() => {
    return async (data) => {
      const response = await authenticatedFetch(url, {
        ...fetchInit,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("res",response)
      if(response.status === 200) {
        navigate(route)
      }
      return response.json();
    };
  }, [url, JSON.stringify(fetchInit)]);

  return useMutation(mutation, {
    ...reactQueryOptions,
  });
};
