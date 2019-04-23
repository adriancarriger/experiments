import Head from 'next/head';

import Nav from '../components/Nav';

export default ({ children, title = 'This is the default title' }) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <header>
      <Nav />
    </header>

    <main>{children}</main>
  </div>
);
