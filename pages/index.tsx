import Head from 'next/head';

import styles from '../styles/Home.module.scss';
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';
import NewsletterRegistration from '../components/input/newsletter-registration';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="A lot of great events that allow you to evolve"
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events}></EventList>
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
