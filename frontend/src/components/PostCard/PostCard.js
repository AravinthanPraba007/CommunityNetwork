import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { generatePath } from 'react-router-dom';
import styled from 'styled-components';
import { withApollo } from 'react-apollo';

import Comment from 'components/Comment';
import CreateComment from 'components/CreateComment';
import Like from 'components/Like';
import { DotsIcon, PostCommentIcon } from 'components/icons';
import { Spacing } from 'components/Layout';
import { A, H3 } from 'components/Text';
import { Button } from 'components/Form';
import PostCardOption from 'components/PostCard/PostCardOption';
import Modal from 'components/Modal';
import Avatar from 'components/Avatar';

import { GET_FOLLOWED_POSTS, DELETE_POST } from 'graphql/post';
import { GET_AUTH_USER } from 'graphql/user';
import { GET_USER_POSTS } from 'graphql/user';

import {
  HOME_PAGE_POSTS_LIMIT,
  PROFILE_PAGE_POSTS_LIMIT,
} from 'constants/DataLimit';

import { useStore } from 'store';

import * as Routes from 'routes';

import { timeAgo } from 'utils/date';

const Root = styled.div`
  width: 100%;
  border-radius: ${p => p.theme.radius.sm};
  padding-bottom: ${p => p.theme.spacing.xs};
  background-color: ${p => p.theme.colors.white};
  border: 1px solid ${p => p.theme.colors.border.main};
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${p => p.theme.spacing.xs} ${p => p.theme.spacing.sm};
`;

const CreatedAt = styled.div`
  font-size: ${p => p.theme.font.size.xxs};
  color: ${p => p.theme.colors.text.hint};
  border-bottom: 1px solid ${p => p.theme.colors.text.secondary};
  border: 0;
  margin-top: 2px;
`;

const Author = styled(A)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Name = styled.span`
  font-size: ${p => p.theme.font.size.xs};
  font-weight: ${p => p.theme.font.weight.bold};
  color: ${p => p.theme.colors.primary.main};
`;

const Poster = styled.img`
  display: block;
  width: 100%;
  max-height: 700px;
  object-fit: cover;
  cursor: pointer;
  margin-bottom: ${p => p.theme.spacing.sm};
`;

const BottomRow = styled.div`
  overflow: hidden;
`;

const CountAndIcons = styled.div`
  padding: 0 ${p => p.theme.spacing.sm};
`;

const Count = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${p => p.theme.spacing.xs};
  font-size: ${p => p.theme.font.size.xs};
  color: ${p => p.theme.colors.text.secondary};
`;

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${p => p.theme.colors.border.main};
`;

const Comments = styled.div`
  padding: 0 ${p => p.theme.spacing.sm};
`;

const StyledButton = styled(Button)`
  padding: 0;
  padding-left: 4px;
  font-size: ${p => p.theme.font.size.xxs};
`;

const CommentLine = styled.div`
  margin-bottom: 5px;
  border-top: 1px solid ${p => p.theme.colors.border.main};
`;

/**
 * Extra component
 * 
 */

const CreatedBy = styled.div`
display: flex;
flex-direction: row;
align-items: center;
border-bottom: 1px solid ${p => p.theme.colors.border.main};
border-top: 1px solid ${p => p.theme.colors.border.main};
padding: ${p => p.theme.spacing.xs};
margin-bottom: ${p => p.theme.spacing.xxs};
`;



const CreatedByText = styled.div`
  font-size: ${p => p.theme.font.size.xxs};
  padding-left: ${p => p.theme.spacing.xs};
`;

/**
 * Component for rendering user post
 */
const PostCard = ({
  author,
  createdBy,
  imagePublicId,
  comments,
  title,
  createdAt,
  image,
  likes,
  postId,
  openModal,
  client,
}) => {
  const [{ auth }] = useStore();
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const toggleCreateComment = () => {
    setIsCommentOpen(true);
  };

  const toggleComment = () => {
    setIsCommentOpen(!isCommentOpen);
  };

  const closeOption = () => setIsOptionOpen(false);

  const openOption = () => setIsOptionOpen(true);

  const deletePost = async () => {
    try {
      await client.mutate({
        mutation: DELETE_POST,
        variables: { input: { id: postId, imagePublicId } },
        refetchQueries: () => [
          {
            query: GET_FOLLOWED_POSTS,
            variables: {
              userId: auth.user.id,
              skip: 0,
              limit: HOME_PAGE_POSTS_LIMIT,
            },
          },
          { query: GET_AUTH_USER },
          {
            query: GET_USER_POSTS,
            variables: {
              username: auth.user.username,
              skip: 0,
              limit: PROFILE_PAGE_POSTS_LIMIT,
            },
          },
        ],
      });
    } catch (err) { }

    setIsOptionOpen(false);
  };

  return (
    <>
      <Root>
        <Modal onClose={closeOption} open={isOptionOpen}>
          <PostCardOption
            postId={postId}
            closeOption={closeOption}
            author={author}
            createdBy={createdBy}
            deletePost={deletePost}
          />
        </Modal>

        <TopRow>
          <Author
            to={generatePath(Routes.USER_PROFILE, {
              username: author.username,
            })}
          >
            <Avatar image={author.image} />

            <Spacing left="xs">
              <Name>{author.fullName}</Name>
              <CreatedAt>{timeAgo(createdAt)}</CreatedAt>
            </Spacing>
          </Author>

          <Button ghost onClick={openOption}>
            <DotsIcon />
          </Button>
        </TopRow>

        {createdBy.id !== author.id && (
          <CreatedBy>
            <CreatedByText>
              Posted by
        </CreatedByText>
            <Spacing left="xs" inline>
              <A
                to={generatePath(Routes.USER_PROFILE, {
                  username: createdBy.username
                })}
              >
                <Name>{createdBy.fullName}</Name>
              </A>
            </Spacing>
          </CreatedBy>
        )}

        <Spacing left="sm" bottom="sm" top="xs" style={{wordWrap :"break-word"}}>
          <H3>{title}</H3>
        </Spacing>

        {image && <Poster src={image} onClick={openModal} />}

        <BottomRow>
          <CountAndIcons>
            <Count>
              {likes.length} likes
              <Spacing />
              <StyledButton onClick={toggleComment} text>
                {comments.length} comments
              </StyledButton>
            </Count>

            <Icons>
              <Like
                fullWidth
                withText
                user={author}
                postId={postId}
                likes={likes}
              />

              <Button fullWidth text onClick={toggleCreateComment}>
                <PostCommentIcon /> <Spacing inline left="xxs" /> <b>Comment</b>
              </Button>
            </Icons>
          </CountAndIcons>

          {isCommentOpen && (
            <>
              <Spacing top="xs">
                <CommentLine />
                <CreateComment
                  post={{ id: postId, author }}
                  focus={isCommentOpen}
                />
              </Spacing>

              {comments.length > 0 && <CommentLine />}

              <Comments>
                {comments.map(comment => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    postId={postId}
                    postAuthor={author}
                  />
                ))}
              </Comments>
            </>
          )}
        </BottomRow>
      </Root>
    </>
  );
};

PostCard.propTypes = {
  author: PropTypes.object.isRequired,
  createdBy: PropTypes.object,
  imagePublicId: PropTypes.string,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  likes: PropTypes.array.isRequired,
  comments: PropTypes.array,
  createdAt: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
};

export default withApollo(PostCard);
