import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import WidgetSm from "../../components/WidgetSm";
import WidgetLg from "../../components/WidgetLg";

import { userData } from "../../dummyData.js";

import styled from "styled-components";

import DashboardLayout from "../../layout/DashboardLayout";

const Wrapper = styled.div`
  flex: 8;
`;

const Widgets = styled.div`
  display: flex;
  margin: 20px;
`;

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Wrapper>
        <FeaturedInfo />
        <Chart
          data={userData}
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
