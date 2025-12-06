import { Line, LineChart, XAxis,ResponsiveContainer,Tooltip,YAxis  } from 'recharts';
const Chart = ({hourlyData}) => {

console.log("hourly=>",hourlyData)
  return (
   <div style={{ width: "100%"}}>
      <ResponsiveContainer>
        <LineChart data={hourlyData}>
          <XAxis dataKey="time" tick={{ fill: "#aaa" }} />
           <YAxis width="auto" label={{ value: 'Temp', position: 'insideLeft', angle: -90 }} />
         
          
          <Line
            type="monotone"
            dataKey="temp"
            
            stroke="#000"
            strokeWidth={1}
            dot={{ r: 3, fill: "#fff" }}
            activeDot={{ r: 6 }}
          />

           <Tooltip/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart