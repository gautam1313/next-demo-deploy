import { Fragment } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
// import { useState, useEffect } from "react";
import Head from "next/head";

const HomePage = (props) => {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   setLoadedMeetups(DUMMY_meetup);
  // }, []);

  return (
    <Fragment>
      <Head>
        <title>Clubs List</title>
        <meta name="description" content="All clubs found here" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  ); //DUMMY_meetup//loadedMeetups
};

// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_meetup,
//     },
//   };
// };

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://Sebastian:Sebastian@cluster0.rksqy.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const result = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: result.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
      })),
    },
    revalidate: 10,
  };
};

export default HomePage;
