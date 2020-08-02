import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, generatePath } from 'react-router-dom';
import { useSubscription } from '@apollo/react-hooks';

import { IS_USER_ONLINE_SUBSCRIPTION } from 'graphql/user';

import { H1 } from 'components/Text';
import { Spacing } from 'components/Layout';
import Follow from 'components/Follow';
import ProfileImageUpload from './ProfileImageUpload';
import ProfileCoverUpload from './ProfileCoverUpload';

import { useStore } from 'store';

import * as Routes from 'routes';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -140px;
`;

const FullName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: ${p => p.theme.spacing.sm};
  position: relative;

  ${H1} {
    font-size: ${p => p.theme.font.size.lg};
  }

  @media (min-width: ${p => p.theme.screen.md}) {
    ${H1} {
      font-size: ${p => p.theme.font.size.xl};
    }
  }
`;

const FollowAndMessage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: ${p => p.theme.spacing.sm};
`;

const Message = styled(Link)`
  text-decoration: none;
  font-size: ${p => p.theme.font.size.xs};
`;

const Online = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${p => p.theme.colors.success};
  margin-left: ${p => p.theme.spacing.sm};
  border-radius: 50%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: ${p => p.theme.font.size.xs};
  margin-top: ${p => p.theme.spacing.sm};
`;

const List = styled.div`
  padding: 0 ${p => p.theme.spacing.xs};
  color: ${p => p.theme.colors.grey[800]};
  white-space: nowrap;

  @media (min-width: ${p => p.theme.screen.md}) {
    padding: 0 ${p => p.theme.spacing.lg};
  }
`;
/**
 *Extra components
 */
const HeadLineInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  font-size: ${p => p.theme.font.size.xs};
  margin-top: ${p => p.theme.spacing.sm};
  margin-left: ${p => p.theme.spacing.sm};
  margin-right: ${p => p.theme.spacing.sm};
`;
const Button = styled.button`
  height: 27px;
  outline: none;
  font-size: ${p => p.theme.font.size.xxs};
  font-weight: ${p => p.theme.font.weight.bold};
  transition: background-color 0.2s, border-color 0.1s;
  border-radius: ${p => p.theme.radius.sm};
  color: ${p => p.theme.colors.black};
  padding: ${p => p.theme.spacing.xxs} ${p => p.theme.spacing.xs};
  border: ${p => `1px solid ${p.theme.colors.border.main}`};
  background-color: ${p => 'transparent'};
  border-color: ${p => p.theme.colors.border.dark};

`;
/**
 * Renders user information in profile page
 */
const ProfileInfo = ({ user }) => {
  const [{ auth }] = useStore();

  const { data, loading } = useSubscription(IS_USER_ONLINE_SUBSCRIPTION, {
    variables: { authUserId: auth.user.id, userId: user.id },
  });

  let isUserOnline = user.isOnline;
  if (!loading && data) {
    isUserOnline = data.isUserOnline.isOnline;
  }

  let isPage = user.isPage;
  let linkedInUrl = user.linkedInUrl;
  let linkedInUrlEmpty = true;
  let headLineEmpty = true;

  if ((user.headLine) && (user.headLine.trim() !== '')) {
    headLineEmpty = false;
  }
  if ((user.linkedInUrl) && (user.linkedInUrl.trim() !== '')) {
    linkedInUrlEmpty = false;
  }
  return (
    <Root>
      <ProfileCoverUpload
        userId={user.id}
        coverImage={user.coverImage}
        coverImagePublicId={user.coverImagePublicId}
      />

      <ProfileImage>
        <ProfileImageUpload
          userId={user.id}
          image={user.image}
          imagePublicId={user.imagePublicId}
          username={user.username}
        />
        {isPage && (
          <Info>
            <Button
              disabled={loading}
            >
              Page
            </Button>
          </Info>
        )}
        <FullName>
          <H1>{user.fullName}</H1>

          {isUserOnline && auth.user.id !== user.id && <Online />}

          {auth.user.id !== user.id && (
            <FollowAndMessage>
              <Follow user={user} />

              <Spacing left="sm" />
              <Message to={generatePath(Routes.MESSAGES, { userId: user.id })}>
                Message
              </Message>
            </FollowAndMessage>
          )}
        </FullName>
      </ProfileImage>

      <Info>
        <List>
          <b>{user.posts.length} </b> posts
        </List>
        <List>
          <b>{user.followers.length} </b> followers
        </List>
        <List>
          <b>{user.following.length} </b> following
        </List>
      </Info>

      {!linkedInUrlEmpty && (
        <>
          <Info>
            <u><b>Connect via </b></u>
          </Info>
          <HeadLineInfo>
            <Link to="route" target="_blank" onClick={(event) => { event.preventDefault(); window.open(linkedInUrl); }}>
              {user.linkedInUrl}
            </Link>
          </HeadLineInfo>
        </>
      )}

      {!headLineEmpty && (
        <>
          <Info><b> <u>HeadLine: </u></b></Info>
          <HeadLineInfo>
            {user.headLine}
          </HeadLineInfo>
        </>
      )}
    </Root>
  );
};

ProfileInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileInfo;
