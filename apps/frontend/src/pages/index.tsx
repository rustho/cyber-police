import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LandingPage } from "../components/Landing";

export default function Home() {
  return <LandingPage />;
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
