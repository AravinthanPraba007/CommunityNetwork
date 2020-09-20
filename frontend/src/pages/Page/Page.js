import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Container } from 'components/Layout';
import Skeleton from 'components/Skeleton';
import { Loading } from 'components/Loading';
import Empty from 'components/Empty';
import InfiniteScroll from 'components/InfiniteScroll';
import Head from 'components/Head';
import PageCard from './PageCard';
import { GET_USERS } from 'graphql/user';

import { PEOPLE_PAGE_USERS_LIMIT } from 'constants/DataLimit';

import { useStore } from 'store';

import { Query } from 'react-apollo';

const Root = styled(Container)`
  margin-top: ${p => p.theme.spacing.lg};

  @media (min-width: ${p => p.theme.screen.lg}) {
    margin-left: ${p => p.theme.spacing.lg};
    padding: 0;
  }
`;

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 3fr));
  grid-auto-rows: auto;
  grid-gap: 20px;
  margin-bottom: ${p => p.theme.spacing.lg};
`;

/**
 * List of PAGES page
 */
const Page = () => {
  const [{ auth }] = useStore();
  const variables = {
    userId: auth.user.id,
    isPage: true,
    skip: 0,
    limit: PEOPLE_PAGE_USERS_LIMIT,
  };

  return (
    <Root maxWidth="md">
      <Head title="Find new Pages" />

      <Query
        query={GET_USERS}
        variables={variables}
        notifyOnNetworkStatusChange
      >
        {({ data, loading, fetchMore, networkStatus }) => {
          if (loading && networkStatus === 1) {
            return (
              <PageContainer>
                <Skeleton height={280} count={PEOPLE_PAGE_USERS_LIMIT} />
              </PageContainer>
            );
          }

          const { users, count } = data.getUsers;

          if (!users.length > 0) return <Empty text="No pages yet." />;

          return (
            <InfiniteScroll
              data={users}
              dataKey="getUsers.users"
              count={parseInt(count)}
              variables={variables}
              fetchMore={fetchMore}
            >
              {data => {
                const showNextLoading =
                  loading && networkStatus === 3 && count !== data.length;

                return (
                  <Fragment>
                    <PageContainer>
                      {data.map(user => (
                        <PageCard key={user.id} user={user} />
                      ))}
                    </PageContainer>

                    {showNextLoading && <Loading top="lg" />}
                  </Fragment>
                );
              }}
            </InfiniteScroll>
          );
        }}
      </Query>
    </Root>
  );
};

export default Page;
