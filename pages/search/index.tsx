import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { projects, Project } from '../../data/projects';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface Match {
  type: 'project' | 'tech';
  matchType: string;
  matchText: string;
}

interface ConsolidatedResult {
  project: Project;
  matches: Match[];
}

const SearchPage = () => {
  const router = useRouter();
  const { q } = router.query;
  const [searchQuery, setSearchQuery] = useState(q as string || '');
  const [results, setResults] = useState<ConsolidatedResult[]>([]);

  const searchProjects = (query: string) => {
    if (!query) {
      setResults([]);
      return;
    }

    const searchMap = new Map<string, ConsolidatedResult>();
    const lowercaseQuery = query.toLowerCase();

    Object.values(projects).forEach(project => {
      const matches: Match[] = [];

      // Search in title and description
      if (project.title.toLowerCase().includes(lowercaseQuery)) {
        matches.push({
          type: 'project',
          matchType: 'Title',
          matchText: project.title
        });
      }

      if (project.description.toLowerCase().includes(lowercaseQuery)) {
        matches.push({
          type: 'project',
          matchType: 'Description',
          matchText: project.description
        });
      }

      // Search in tech stack
      project.techStack.forEach(tech => {
        if (tech.toLowerCase().includes(lowercaseQuery)) {
          matches.push({
            type: 'tech',
            matchType: 'Technology',
            matchText: tech
          });
        }
      });

      // Search in features
      project.features.forEach(feature => {
        feature.details.forEach(detail => {
          if (detail.toLowerCase().includes(lowercaseQuery)) {
            matches.push({
              type: 'project',
              matchType: `Feature: ${feature.title}`,
              matchText: detail
            });
          }
        });
      });

      // If we found any matches, add to results
      if (matches.length > 0) {
        searchMap.set(project.id, {
          project,
          matches: matches.slice(0, 3) // Limit to 3 matches per project
        });
      }
    });

    setResults(Array.from(searchMap.values()));
  };

  useEffect(() => {
    if (q) {
      setSearchQuery(q as string);
      searchProjects(q as string);
    }
  }, [q]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    searchProjects(searchQuery);
  };

  return (
    <Layout>
      <SearchContainer>
        <Head>
          <title>Roughfts Search</title>
        </Head>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Search Projects
        </motion.h1>

        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, technologies, features..."
          />
          <SearchButton type="submit">Search</SearchButton>
        </SearchForm>

        <ResultsContainer>
          {results.length === 0 && searchQuery && (
            <NoResults>No results found for "{searchQuery}"</NoResults>
          )}
          
          {results.map((result, index) => (
            <ResultCard
              key={result.project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/works/${result.project.id}`}>
                <ResultTitle>{result.project.title}</ResultTitle>
                <MatchesContainer>
                  {result.matches.map((match, idx) => (
                    <MatchItem key={idx}>
                      <MatchType>{match.matchType}</MatchType>
                      <MatchText>
                        {match.type === 'tech' ? (
                          <TechTag>{match.matchText}</TechTag>
                        ) : (
                          match.matchText
                        )}
                      </MatchText>
                    </MatchItem>
                  ))}
                </MatchesContainer>
              </Link>
            </ResultCard>
          ))}
        </ResultsContainer>
      </SearchContainer>
    </Layout>
  );
};

const SearchContainer = styled.div`
  padding: 6rem 2rem 2rem;
  min-height: 100vh;
  background: #000;
  color: white;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 3rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }
`;

const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto 3rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: #111;
  color: white;
  font-size: 1.1rem;

  &:focus {
    outline: 2px solid #333;
  }
`;

const SearchButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  background: #333;
  color: white;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #444;
  }
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ResultCard = styled(motion.div)`
  background: #111;
  border-radius: 8px;
  overflow: hidden;
  
  a {
    display: block;
    padding: 1.5rem;
    color: white;
    text-decoration: none;
    transition: background 0.3s;

    &:hover {
      background: #222;
    }
  }
`;

const ResultTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
`;

const MatchesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1rem;
`;

const MatchItem = styled.div`
  padding: 0.5rem;
  background: #1a1a1a;
  border-radius: 4px;
`;

const MatchType = styled.div`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.5rem;
`;

const MatchText = styled.div`
  font-size: 1rem;
  opacity: 0.8;
`;

const TechTag = styled.span`
  display: inline-block;
  background: #333;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  color: #888;
`;

export default SearchPage; 