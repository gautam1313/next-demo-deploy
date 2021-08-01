import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

const NewMeetupPage = () => {
  const router = useRouter();
  const NewMeetupData = async (enteredData) => {
    // console.log(enteredData);

    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>New Club Form</title>
        <meta name="description" content="Add new club details here." />
      </Head>
      <NewMeetupForm onAddMeetup={NewMeetupData} />
    </Fragment>
  );
};

export default NewMeetupPage;
