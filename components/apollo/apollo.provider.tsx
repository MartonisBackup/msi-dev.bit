import React, { PropsWithChildren, useMemo, useEffect, useContext } from 'react'
import { ApolloClient, NormalizedCacheObject, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useCookies } from 'react-cookie';
import { useQueryParam, StringParam } from 'use-query-params';
import { onError } from "@apollo/client/link/error";
import { useHistory, useLocation } from 'react-router';
import { toast } from 'react-toastify';
import { LanguageContext } from '@bit/martonis.react.language';

export function ApolloClientProvider({ redirectUrl, children }: PropsWithChildren<{ redirectUrl: string,  }>) {
  const [{ access_token }, setCookie] = useCookies(['access_token']);
  const [ urlAccessToken, setUrlAccessToken ] = useQueryParam('access_token', StringParam);
  const [ language ] = useContext(LanguageContext);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if(urlAccessToken) {
      setCookie('access_token', urlAccessToken, { expires: new Date(new Date().setDate(365)) });
      setUrlAccessToken(undefined);
    }
  }, [urlAccessToken])


  const client = useMemo(() => {
    const cache = new InMemoryCache();
    const httpLink = createHttpLink({
      uri: '/graphql',
      credentials: 'same-origin'
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        for(let i = 0; i< graphQLErrors.length; i++) {
          
          const { message, path, locations } = graphQLErrors[i];

          if(message === 'Unauthorized')
            return history.push({ pathname: redirectUrl, search: `?returnUrl=${location.pathname + location.search}&local=1`} );

          toast.error(message, { toastId: message });
        }
      }

      if (networkError) {
        toast.error(networkError.message, { toastId: networkError.message });
      };
    });

    
    const languageLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          "accept-Language": language
        }
      }
    });
    
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: access_token ? `Bearer ${access_token}` : "",
        }
      }
    });
    
    return new ApolloClient({
      link: authLink.concat(languageLink).concat(errorLink).concat(httpLink),
      cache,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network', errorPolicy: "ignore"
        },
        mutate: {
          errorPolicy: "ignore"
        },
        query: {
          errorPolicy: "ignore"
        }
      }
    });
  }, [access_token])

  return (
    <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
  );
}
