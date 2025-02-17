import { motion } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Import experiences data
import developmentTips from '../../data/experiences/development-tips.json';

const experiences = [developmentTips];
// ... you can add more experience JSON imports here

const ExperienceDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const locale = router.locale || 'en';

  const experience = experiences.find(exp => exp.slug === slug);

  if (!experience) {
    return <div>Experience not found</div>;
  }

  return (
    <Layout>
      <DetailContainer>
        <Head>
          <title>{experience.title[locale]} | Roughfts</title>
        </Head>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {experience.title[locale]}
        </motion.h1>
        
        <Year>{experience.year}</Year>
        
        <Description
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {experience.description[locale]}
        </Description>

        <ContentSection>
          {experience.details?.[locale]?.map((section, index) => (
            <Section key={index}>
              <SectionTitle>{section.title}</SectionTitle>
              {section.content.map((content, i) => (
                <SectionContent key={i}>{content}</SectionContent>
              ))}
              {section.subDetails && (
                <SubDetailsList key="subDetailsList">
                  {section.subDetails.map((subDetail, i) => (
                    <SubDetail key={i}>
                      <SubDetailTitle>{subDetail.title}</SubDetailTitle>
                      {subDetail.content.map((content, j) => (
                        <SectionContent key={j}>{content}</SectionContent>
                      ))}
                    </SubDetail>
                  ))}
                </SubDetailsList>
              )}
            </Section>
          )) || <div>No content available for this language</div>}
        </ContentSection>
      </DetailContainer>
    </Layout>
  );
};

const DetailContainer = styled.div`
  padding: 6rem 2rem 2rem;
  min-height: 100vh;
  background: #000;
  color: white;
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const Year = styled.div`
  font-size: 1.5rem;
  color: #888;
  margin-bottom: 2rem;
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ContentSection = styled.div`
  margin-top: 2rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const SectionContent = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #ddd;
`;

const SubDetailsList = styled.div`
  margin-left: 1.5rem;
  margin-top: 1rem;
`;

const SubDetail = styled.div`
  margin-bottom: 1.5rem;
`;

const SubDetailTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;

export default ExperienceDetailPage; 