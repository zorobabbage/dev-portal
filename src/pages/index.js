import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import useThemeContext from '@theme/hooks/useThemeContext';
import StarSvg from './components/cards_img01.js';
import CodeSvg from './components/cards_img02.js';
import MineSvg from './components/cards_img03.js';
import ExchangeSvg from './components/cards_img04.js';
import ContributeSvg from './components/cards_img05.js';

import Head from '@docusaurus/Head';

import Translate from '@docusaurus/Translate';

const CoverImgDiv = () => {
  const {isDarkTheme} = useThemeContext();
  if (isDarkTheme) {
    document.documentElement.setAttribute('data-theme', 'dark');
    return (
      <>
        <div className="cover-image">
          <img className="cover-image-hand" src={useBaseUrl('img/hand.png')}/>
        </div>
      </>
    );
  } else {
    return (
      <div className="cover-image">
        <img className="cover-image-hand" src={useBaseUrl('img/hand_light.png')}/>
      </div>
    );
  }
};

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

const CustomMeta = () => (
  <Head>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:domain" content="china-zil.com" />
    <meta data-react-helmet="true" name="twitter:site" content="@zorobabbage"/>
    <meta name="twitter:title" content="Zilliqa 开发者门户" />
    <meta name="twitter:image" content="http://dev-portal.china-zil.com/img/hand_light.png" />
    <meta name="twitter:image:src" content="http://dev-portal.china-zil.com/img/hand_light.png" />
  </Head>
);

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  return (
      <Layout>
        <CustomMeta />
        <div className="cover-container">
          <div className="cover-title">
            <h1 className="hero__title">
              <Translate id="site.translation.title">
                {siteConfig.title}
              </Translate>
            </h1>
            <p className="hero__subtitle">
              <Translate id="site.translation.tagline">
                {siteConfig.tagline}
              </Translate>
            </p>
          </div>
          <CoverImgDiv/>
        </div>
        <div id="cover-cards">
          <div className="column">
            <a href={useBaseUrl('docs/basics/basics-intro-blockchain')}>
              <div>
                  <StarSvg/>
                  <div className="cards-text">
                    <h2><Translate id="site.translation.basics.title">Basics</Translate></h2>
                    <p><Translate id="site.translation.basics.desc">Learn about blockchain and Zilliqa.</Translate></p>
                  </div>
              </div>
            </a>
          </div>
          <div className="column">
            <a href={useBaseUrl('docs/dev/dev-started-introduction')}>
              <div>
                <CodeSvg/>
                <div className="cards-text">
                  <h2><Translate id="site.translation.developers.title">Developers</Translate></h2>
                  <p><Translate id="site.translation.developers.desc">Build full-stack blockchain apps on Zilliqa.</Translate></p>
                </div>
              </div>
            </a>
          </div>
          <div className="column">
            <a href={useBaseUrl('docs/miners/mining-getting-started')}>
              <div>
                <MineSvg />
                <div className="cards-text">
                  <h2><Translate id="site.translation.miners.title">Miners</Translate></h2>
                  <p><Translate id="site.translation.miners.desc">Participate as a miner and start earning $ZIL.</Translate></p>
                </div>
              </div>
            </a>
          </div>
          <div className="column">
            <a href={useBaseUrl('docs/exchanges/exchange-getting-started')}>
              <div>
                <ExchangeSvg/>
                <div className="cards-text">
                  <h2><Translate id="site.translation.exchanges.title">Exchanges</Translate></h2>
                  <p><Translate id="site.translation.exchanges.desc">Information for exchanges and seed node operators.</Translate></p>
                </div>
              </div>
            </a>
          </div>
          <div className="column">
            <a href={useBaseUrl('docs/contributors/contribute-buildzil')}>
              <div>
                <ContributeSvg/>
                <div className="cards-text">
                  <h2><Translate id="site.translation.contributors.title">Contributors</Translate></h2>
                  <p><Translate id="site.translation.contributors.desc">Learn how you can contribute to Zilliqa's ecosystem.</Translate></p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </Layout>
  );
}

export default Home;
