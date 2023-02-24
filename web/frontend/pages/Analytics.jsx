import React from 'react';
import {Page, Card

} from '@shopify/polaris';
import { useAppQuery } from "../hooks";

export default function Analytics() {
  // const {
  //   data,    
  //   refetch: refetchProductCount,
  //   isLoading: isLoadingCount,
  //   isRefetching: isRefetchingCount
  // } = useAppQuery({
  //   url: "/api/homeData",
  //   reactQueryOptions: {
  //     onSuccess: () => {
        
  //     },
  //   },
  // });

  return (
    <>
        <Page title='Analytics'>
          <Card>
            <h1 style={{ 
              margin: 50,
              padding: 50
             }}>Analytics Page</h1>
          </Card>
        </Page>
    </>
  );
}