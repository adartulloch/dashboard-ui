import { useState, useMemo } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useGetSalesQuery } from "../../state/api";
import DatePicker from "react-datepicker";
import { useTheme } from "@mui/material";

const Daily = () => {
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));

  const { data } = useGetSalesQuery();
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const { dailyData } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };

    const totalUnitsLine = {
      id: "totalSales",
      color: theme.palette.secondary[600],
      data: [],
    };
    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      const formattedDate = new Date(date);
      if (formattedDate >= startDate && formattedDate <= endDate) {
        const splitDate = date.substring(date.indexOf("-") + 1);

        totalSalesLine.data = [
          ...totalSalesLine.data,
          {
            x: splitDate,
            y: totalSales,
          },
        ];

        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          {
            x: splitDate,
            y: totalUnits,
          },
        ];
      }
    });

    const formattedData = [totalSalesLine, totalUnitsLine];
    return [formattedData];
  }, [data, startDate, endDate]); //eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DAILY SALES" subtitle="Chart of daily sales">
        <Box height="75vh">
          <Box display="flex" justifyContent="flex-end">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Box>
        </Box>
      </Header>
    </Box>
  );
};

export default Daily;
