import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';

export default function Home() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList items={featuredEvents}></EventList>
    </div>
  );
}
