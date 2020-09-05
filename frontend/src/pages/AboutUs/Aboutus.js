import React from 'react';
import styled from 'styled-components';

import { Container, Content, Spacing } from 'components/Layout';


import Head from 'components/Head';
import { UserIcon } from 'components/icons';

import { H1, A } from 'components/Text';


import { useStore } from 'store';

import * as Routes from 'routes';

import * as ContentData from './AboutUsConstants';

import defaultBackgroundImage from './../Profile/background.jpg';

/**
 * Not used imports
import { GET_POSTS } from 'graphql/post';
import { EXPLORE_PAGE_POSTS_LIMIT } from 'constants/DataLimit';
import ExploreCard from './ExploreCard';
import Skeleton from 'components/Skeleton';
import PostPopup from 'components/PostPopup';
import Modal from 'components/Modal';
import InfiniteScroll from 'components/InfiniteScroll';
import Empty from 'components/Empty';
import { Loading } from 'components/Loading';
import { generatePath } from 'react-router-dom';
import { Query } from 'react-apollo';
import React, { useState, Fragment } from 'react';
 * 
 */


const Root = styled(Container)`
  margin-top: ${p => p.theme.spacing.lg};
  background-color: white;
`;


/**
 * Not used Style components
 * 
 const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 3fr));
  grid-auto-rows: auto;
  grid-gap: 20px;
`;

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 3fr));
  grid-auto-rows: auto;
  grid-gap: 20px;
  margin-bottom: ${p => p.theme.spacing.lg};
`;
 
const Button = styled.button`
  height: 27px;
  cursor: pointer;
  outline: none;
  font-size: ${p => p.theme.font.size.xxs};
  font-weight: ${p => p.theme.font.weight.bold};
  transition: background-color 0.2s, border-color 0.1s;
  border-radius: ${p => p.theme.radius.sm};
  color: ${p => !p.isFollowing && p.theme.colors.white};
  padding: ${p => p.theme.spacing.xxs} ${p => p.theme.spacing.xs};
  border: ${p =>
    p.isFollowing ? `1px solid ${p.theme.colors.border.main}` : '0'};
  background-color: ${p =>
    p.isFollowing ? 'transparent' : p.theme.colors.primary.main};

  &:hover {
    border-color: ${p => p.theme.colors.border.dark};
  }
`;


 */

/**
 * Need a column flex
 */



/**
 *  Button
 */ 


/**
 * Headings
 * import Head from 'components/Head';
 */

const FullName = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
text-align: center;
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
const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-left: ${p => p.theme.spacing.xs};
`;
/**
 * Headings
 * import Head from 'components/Head';
 */

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: ${p => p.theme.font.size.xs};
  margin-top: ${p => p.theme.spacing.sm};
  border-radius: ${p => p.theme.radius.sm};
  border: ${p =>`1px solid ${p.theme.colors.border.main}`};
`;
const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  font-size: ${p => p.theme.font.size.xs};
  margin-top: ${p => p.theme.spacing.sm};
  margin-left: ${p => p.theme.spacing.sm};
  margin-right: ${p => p.theme.spacing.sm};
  margin-bottom: ${p => p.theme.spacing.sm};
`;
const Heading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  font-size: ${p => p.theme.font.size.sm};
  margin-top: ${p => p.theme.spacing.lg};
  margin-left: ${p => p.theme.spacing.xs};
  margin-right: ${p => p.theme.spacing.xs};
  margin-bottom: ${p => '0'};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CoverPic = styled.div`
  width: 100%;
  height: 350px;
  position: relative;
  background-image: url(${p => (p.image ? p.image : defaultBackgroundImage)});
  background-size: cover;
  background-position: center;
  border-bottom-left-radius: ${p => p.theme.radius.md};
  border-bottom-right-radius: ${p => p.theme.radius.md};
  box-shadow: ${p => p.theme.shadows.sm};
`;
const ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -140px;
`;
const Label = styled.label`
  position: relative;
  width: 180px;
  height: 180px;
  display: block;
  overflow: hidden;
  cursor: ${p => p.authUser && 'pointer'};
  border-radius: 50%;
  border: 4px solid ${p => p.theme.colors.border.main};
  background-color: ${p => p.theme.colors.white};
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  
  justify-content: center;
  margin-top: ${p => p.theme.spacing.sm};
`;

/**
 * AboutUs page
 */
const Aboutus = () => {
  const [{ auth }] = useStore();
  // const image = "https://img.freepik.com/free-vector/man-avatar-profile-on-round-icon_24640-14044.jpg?size=338&ext=jpg";
  const logoImage="data:image/jpeg;base64,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";
  const aravinthanImage="https://media-exp1.licdn.com/dms/image/C5103AQHprpHi_I5ozg/profile-displayphoto-shrink_400_400/0?e=1600905600&v=beta&t=XHco65uBRH3aR8tqMoMbNAMrWtDlgY-1PqWJCoJ5Zvk";
  const amrishImage="https://media-exp1.licdn.com/dms/image/C5103AQGfx5GKYu0t7g/profile-displayphoto-shrink_400_400/0?e=1600905600&v=beta&t=u6uOehbaPzIuxRC-GPGyq7W0e6ctm7-ndYLIHQorYUc";
  

  let goHome=false;
  if(auth===null)
  goHome=true;

  const renderProfileImage = (image) => {
  

    return image ? (
      <Image src={image} alt="profile" accept="image/x-png,image/jpeg" />
    ) : (
      <UserIcon width="172" />
    );
  };

  return (
    <Content>
    <Root maxWidth="md">
    
    <Head title="About Community"/>
    
    {goHome && (
      <>
      <hr></hr>
           <Spacing top="lg" bottom="sm">
           <A to={Routes.HOME}>&larr; Back to Sign Up</A>
         </Spacing>
        </>  )}
    
    
    <CoverPic></CoverPic>
    <ProfileImage>
    <>
    <Label htmlFor="image">
        {renderProfileImage(logoImage)}
      </Label>
    </>
    </ProfileImage>
    <FullName>
      <H1>Welcome to the Community</H1>
    </FullName>
    <Container maxWidth="sm">
    
         
      </Container>
      <Heading>
      Our Goal
      </Heading>
     
      <InfoContainer>
        <Info>
       {ContentData.PRODUCT_DESCRIPTION}
       </Info>
      </InfoContainer>

      <Heading>
      <b>Are you a Junior?</b>
      </Heading>
     
      <InfoContainer>
        <Info>
       {ContentData.PRODUCT_DESCRIPTION}
       </Info>
      </InfoContainer>

      <Heading>
      <b>Are you a Senior?</b>
      </Heading>
     
      <InfoContainer>
        <Info>
       {ContentData.PRODUCT_DESCRIPTION}
       </Info>
      </InfoContainer>

      <Heading>
      <b>Are you a Staff?</b>
      </Heading>
     
      <InfoContainer>
        <Info>
       {ContentData.PRODUCT_DESCRIPTION}
       </Info>
      </InfoContainer>

      <Heading>
      <b>Meet the Team</b>
      </Heading>
      <hr></hr>
<ListItem>
<TeamContainer>
  <>
      <Label htmlFor="image">
        {renderProfileImage(amrishImage)}
      </Label>
    </>
      <Info>
      <b>Amrish Krishnan</b>
      </Info>
      <p>Developer</p>
      </TeamContainer>

      <TeamContainer>
      <>
      <Label htmlFor="image">
        {renderProfileImage(aravinthanImage)}
      </Label>
      </>
      <Info>
      <b>Aravinthan Praba</b>
      </Info>
     <p>Developer</p>
      </TeamContainer>
</ListItem>
      <hr></hr>


      <Spacing top="sm" bottom="sm">
          <Info>Enjoy the Day !!</Info>
      </Spacing>
    </Root>
    </Content>
  );
};
export default Aboutus;
