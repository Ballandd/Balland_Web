import Head from "next/head";
import CompetitionInformation from "../../components/CompetitionInformation";
import { idState } from "../../components/recoil/state";
import { useRecoilState } from 'recoil';
import { useRouter } from "next/router";
import { GetStaticProps } from "next";

interface CompetitionProps {
  data: any;
}

const Competition: React.FC<CompetitionProps> = (props) => {
  const router = useRouter();
  const producs = props.data.data;
  const [id, setidState] = useRecoilState(idState);

  return (
    <div>
      <Head>
        <title>대회 정보</title>
        <link rel="icon" href="/AU.png" />
      </Head>
      <div className="h-max lg:h-screen bg-slate-100">
        <div className="w-[100%] grid justify-items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {producs.map((compete: any, index: number) => (
              <div
                key={compete._id}
                className={`grid justify-items-center md:${
                  index % 2 == 1
                    ? "grid justify-items-start"
                    : "grid justify-items-end"
                }`}
              >
                <button
                  disabled={compete.condition == 1}
                  onClick={() => {
                    setidState(compete._id);
                    router.push({
                      pathname: "/competition/[id]",
                      query: { id: compete._id, viewid: compete._id }
                    });
                  }}
                >
                  <CompetitionInformation
                    picture={compete._id}
                    name={compete.title}
                    period={
                      `${String(compete.startdate).substring(0, 10)}` +
                      " ~ " +
                      `${String(compete.enddate).substring(0, 10)}`
                    }
                    part={compete.host}
                    prize={compete.prize}
                    status={compete.condition}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`${process.env.API_URL}/competition/getall`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};

export default Competition;