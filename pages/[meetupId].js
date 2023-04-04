import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "@/components/meetups/MeetupDetail";
import Head from "next/head";

const MeetupDetails = ({ meetupData }) => {
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail {...meetupData} />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect('mongodb://localhost:27017/meetupnext');
  const db = client.db();

  const meetupsCollection = db.collection('meetupnext');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } })),
    fallback: true
  };
};

export const getStaticProps = async context => {
  let { meetupId } = context.params;
  const client = await MongoClient.connect('mongodb://localhost:27017/meetupnext');
  const db = client.db();

  const meetupsCollection = db.collection('meetupnext');
  let meetupData = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });
  meetupData = { ...meetupData, id: meetupData._id.toString() };
  delete meetupData._id;
  client.close();
  return { props: { meetupData } };
};

export default MeetupDetails;