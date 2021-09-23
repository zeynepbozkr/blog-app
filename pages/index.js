import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import DateTime from "../components/dateTime";
import Navbar from "../components/navbar";
import AddPost from "../components/AddPost";

// const AddPost = dynamic(() => import("../components/AddPost"), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <AddPost />
    </>
  );
}
