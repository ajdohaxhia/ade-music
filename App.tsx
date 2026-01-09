import React from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import Discography from './components/Discography';
import { About } from './components/About';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <Discography />
      <About />
      <Footer />
    </Layout>
  );
};

export default App;