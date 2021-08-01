import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";
import Head from "next/head";

const MeetupDescription = (props) => {
  return (
    // <MeetupDetail
    //   image="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg"
    //   title="Bernabeu"
    //   address="Madrid, Spain"
    //   description="Welcome to capital"
    // />
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail {...props.meetupData} />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://Sebastian:Sebastian@cluster0.rksqy.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");
  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupid: meetup._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  const meetupid = context.params.meetupid;

  const client = await MongoClient.connect(
    "mongodb+srv://Sebastian:Sebastian@cluster0.rksqy.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");
  const meetup = await meetupCollections.findOne({ _id: ObjectId(meetupid) });
  client.close();
  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
};

export default MeetupDescription;
