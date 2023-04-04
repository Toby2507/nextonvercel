import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups" />
      </Head>
      <MeetupList meetups={meetups} />;
    </>
  );
};

// export const getServerSideProps = async context => {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: { meetups: Dummy_meetups }
//   };
// };

export const getStaticProps = async () => {
  const client = await MongoClient.connect('mongodb://localhost:27017/meetupnext');
  const db = client.db();

  const meetupsCollection = db.collection('meetupnext');
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString()
      })),
      revalidate: 10
    }
  };
};

export default HomePage;