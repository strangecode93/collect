import { Loading } from "../components/Loading";
import PinCard from "../components/PinCard";
import { PinData } from "../context/PinContext";

const Home = () => {
  const { pins, loading } = PinData();
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-wrap m-4">
              {pins && pins.length > 0 ? (
                pins.map((e, i) => <PinCard key={i} pin={e}/>)
              ) : (
                <p className="text-center w-full font-xl font-semibold">No pins yet :(</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
