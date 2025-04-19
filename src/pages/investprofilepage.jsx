import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import HomeLayout from "../components/layouts/homelayout";
import { useResultStore } from "../store/resultStore";
import { convertInvestmentData } from "../utils/general";
import { investProfile } from "../utils/profiles";
export default function InvestProfilePage() {
  const [hovered, setHovered] = useState(null);
  const [userResult, setUserResult] = useState([]);
  const [data, setData] = useState([]);
  const { result } = useResultStore();
  const navigate = useNavigate();

  useEffect(() => {
    const resultData = investProfile.find(
      (item) => item.name === result.data.risk_profile
    );
    const mappingChart = convertInvestmentData(result.data.floored_percentages);

    setUserResult(resultData);
    setData(mappingChart);
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col min-h-screen items-center justify-center rounded-xl px-15">
        <div className="flex flex-col items-end w-full md:flex-row gap-10">
          {/* Left Box */}
          <div className="flex-1">
            {/* Text content - stays on top */}
            <div className="h-full w-full pt-20 md:pt-24 relative z-10 mb-4">
              <h1 className="text-white font-medium text-4xl md:text-3xl leading-tight tracking-normal font-inter">
                Ini dia hasil rekomendasi
              </h1>

              <h1 className="font-extrabold text-4xl md:text-4xl leading-tight tracking-normal font-inter text-[#FFD573] pl-0 md:pl-28">
                Investasi Syariah<span className="text-white">mu!</span>
              </h1>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="flex flex-col lg:hidden text-center mb-5 lg:mb-0">
                <span className="text-gray-500 block mb-1 text-[0.75rem] mb-2">
                  Jenis Profile Resiko
                </span>
                <div className="">
                  <span
                    className={`font-semibold px-8 py-2 rounded-full text-md ${
                      userResult.name === "Moderat"
                        ? "bg-emerald-100 text-emerald-700"
                        : userResult.name === "Agresif"
                        ? "text-[#A72814] bg-[#FFF1EF]"
                        : "text-[#866724] bg-[#FFF1EF]"
                    }`}
                  >
                    {userResult.name}
                  </span>
                </div>
              </div>
              <div className="flex items-start justify-between mb-4 gap-2">
                <div className="flex items-center gap-4">
                  {/* <span className='text-4xl'>🐎</span> */}
                  <img
                    src={userResult.img}
                    alt="profile-logo"
                    className="w-20 h-auto"
                  />
                  <div>
                    <h2 className="text-lg font-bold leading-snug">
                      {userResult.title}
                    </h2>
                  </div>
                </div>
                <div className="hidden lg:block text-center">
                  <span className="text-gray-500 block mb-1 text-[0.75rem] mb-2">
                    Jenis Profile Resiko
                  </span>
                  <span
                    className={`font-semibold px-8 py-2 rounded-full text-md ${
                      userResult.name === "Moderat"
                        ? "bg-emerald-100 text-emerald-700"
                        : userResult.name === "Agresif"
                        ? "text-[#A72814] bg-[#FFF1EF]"
                        : "text-[#866724] bg-[#FFF1EF]"
                    }`}
                  >
                    {userResult.name}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {userResult.description}
              </p>
            </div>
          </div>

          {/* Right Box with Chart */}
          <div className="flex-1">
            <div className="bg-white rounded-xl p-6 shadow h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Portofolio Rekomendasi
                </h3>
                <div className="w-full h-64 m-5">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={70}
                        // onMouseEnter={(_, index) => setHovered(index)}
                        // onMouseLeave={() => setHovered(null)}
                        label={({ name, value }) => `${value}%`} // 👈 ini kuncinya
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            stroke={hovered === index ? "#000" : "#fff"}
                            strokeWidth={hovered === index ? 2 : 1}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                  {data.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span>{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="bg-[#1DA996] hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow mt-10 px-5 w-fit self-end mb-5"
          onClick={() => navigate("/dashboard")}
        >
          Lanjut ke Beranda
        </button>
      </div>
    </HomeLayout>
  );
}
