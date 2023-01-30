import { useEffect, useState } from "react"
import React, { type FunctionComponent } from 'react'
import { SampleApi } from "src/api";
import type { WeatherForecast } from "src/api/sample.service";

const ForecastTable = ({ forecasts }: { forecasts: WeatherForecast[] }) => (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Date</th>
          <th>Temp. (C)</th>
          <th>Temp. (F)</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {forecasts.map((f) => (
          <tr key={f.id}>
            <td>{f.dateFormatted}</td>
            <td>{f.temperatureC}</td>
            <td>{f.temperatureF}</td>
            <td>{f.summary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  

const Weather: FunctionComponent = () => {
    const [loading, setLoading] = useState(true);
    const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
    useEffect(() => {
        SampleApi.getForecastsAsync(5).then(response => {
            console.log(response);
            setForecasts(response);
            setLoading(false);
        });
    }, [])
    if (loading) return <div>Loading...</div>
    return (
        <ForecastTable forecasts={forecasts}></ForecastTable>
    )
}

export default Weather
