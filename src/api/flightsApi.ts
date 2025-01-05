/** @format */

import axios from "axios";

const API_BASE_URL = "http://localhost:2888";

export const fetchTrips = async (
  planIds?: string,
  startTime?: string,
  endTime?: string
) => {
  const response = await axios.get(`${API_BASE_URL}/trips`, {
    params: {},
  });
  return response.data;
};

export const fetchGroundTimes = async (
  planIds?: string,
  startTime?: string,
  endTime?: string
) => {
    const response = await axios.get(`${API_BASE_URL}/ground-times`, {
        params: {},
    });
    return response.data;
};
