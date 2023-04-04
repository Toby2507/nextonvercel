import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
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
  const client = await MongoClient.connect('mongodb+srv://nexttest:tobi1&onlY@tobytodo.miw4lu4.mongodb.net/NextTest?retryWrites=true&w=majority');
  const db = client.db();

  const collection = db.collection('NextTest');
  const meetups = await collection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } })),
    fallback: true
  };
};

export const getStaticProps = async context => {
  let { meetupId } = context.params;
  const client = await MongoClient.connect('mongodb+srv://nexttest:tobi1&onlY@tobytodo.miw4lu4.mongodb.net/NextTest?retryWrites=true&w=majority');
  const db = client.db();

  const collection = db.collection('NextTest');
  let meetupData = await collection.findOne({ _id: new ObjectId(meetupId) });
  meetupData = { ...meetupData, id: meetupData._id.toString() };
  delete meetupData._id;
  client.close();
  return { props: { meetupData } };
};

export default MeetupDetails;