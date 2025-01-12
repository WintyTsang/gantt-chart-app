/** @format */

import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const fetchTrips = async (
  planIds?: string,
  startTime?: string,
  endTime?: string
) => {
  const response = await axios.get(`${API_BASE_URL}/api/v1/chart/plane/trips`, {
    params: {},
  });
  return response.data.results;
};

export const fetchGroundTimes = async (
  planIds?: string,
  startTime?: string,
  endTime?: string
) => {
    const response = await axios.get(`${API_BASE_URL}/api/v1/chart/plane/ground-times`, {
        params: {},
    });
    return response.data.results;
};
