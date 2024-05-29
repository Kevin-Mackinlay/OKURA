import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGZjNmU4NWEwNTYzY2IzYzAxMTZkMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNjg0ODg1MCwiZXhwIjoxNzE3MTA4MDUwfQ.expHdrpDdFIkILDZjCflHDDoYKGyHZkSI6_RrxgznzA";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` }
    });
