// components/Footer.js
import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #1f2937; /* Dark bg matching navbar */
  color: #d1d5db; /* Light gray text */
  padding: 2rem 1rem;
  text-align: center;
  margin-top: auto;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const Links = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;

  a {
    color: #9ca3af;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #f97316; /* Orange on hover */
    }
  }
`;

const Copy = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <Links>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/districts">Districts</a></li>
          <li><a href="/admin">Admin Panel</a></li>
          <li><a href="/login">Login</a></li>
        </Links>
        <Copy>© {new Date().getFullYear()} Video Portal. All rights reserved.</Copy>
      </Container>
      {/* /**
        * Developed by Md Aldehan Kabir Rhyme
        * Portfolio: https://aldehankabir.com
        * GitHub: https://github.com/githubkabir123
        * Email: dev@aldehankabir.com
        *
        * Description:
        * This component/file is part of a project developed by Md Aldehan Kabir Rhyme.
        * Please visit the website to learn more about the developer and their work.
        */ }
    </FooterWrapper>
  );
};

export default Footer;
