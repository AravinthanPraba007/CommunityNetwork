import React from 'react';
import styled from 'styled-components';

import { A, H1, H2 } from 'components/Text';
import { Spacing, Content } from 'components/Layout';
import { UnderConstructionIcon } from 'components/icons';


import * as Routes from 'routes';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${p => p.theme.spacing.lg};
  padding: 0 ${p => p.theme.spacing.sm};
  text-align: center;
`;

/**
 * Component for displaying the page is under construction
 */
const UnderConstruction = () => (
    <Content>
  <Root>
    <H1>Coming Soon!</H1>

    <Spacing top="sm" bottom="md">
      <H2>Page is under construction</H2>
    </Spacing>

    <UnderConstructionIcon width="100" />

    <Spacing bottom="md" />

    <A to={Routes.HOME}>Go back to Home Page</A>
  </Root>
  </Content>
);

export default UnderConstruction;
