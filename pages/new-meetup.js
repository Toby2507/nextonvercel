import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";

const NewMeetup = () => {
  const router = useRouter();
  const addMeetup = async meetupData => {
    let res = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: { 'Content-Type': 'application/json' }
    });
    res = await res.json();
    console.log(res);
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta name="description" content="Add your own meetup an create amazing networking opportunities" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetup} />;
    </>
  );
};

export default NewMeetup;