import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import WidgetSm from "../../components/WidgetSm";
import WidgetLg from "../../components/WidgetLg";

import styled from "styled-components";

import DashboardLayout from "../../layout/DashboardLayout";
import { useEffect, useMemo, useState } from "react";
import useAxios from "../../hooks/useAxios";

const Wrapper = styled.div`
  flex: 8;
`;

const Widgets = styled.div`
  display: flex;
  margin: 20px;
`;

const Dashboard = () => {
  const [userStats, setUserStats] = useState([]);
  const [api] = useAxios();
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await api.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MONTHS]);

  return (
    <DashboardLayout>
      <Wrapper>
        <FeaturedInfo />
        <Chart
          data={userStats}
          title="User Analytics"
          grid
          dataKey="Active User"
        />
        <Widgets>
          <WidgetSm />
          <WidgetLg />
        </Widgets>
      </Wrapper>
    </DashboardLayout>
  );
};

export default Dashboard;
