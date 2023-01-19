import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RfbmFtZSI6ImFua2l0IiwibGFzdF9uYW1lIjoic2luZ2giLCJidXNpbmVzc19uYW1lIjpudWxsLCJkb2IiOiIxOTg4LTA2LTE2VDAwOjAwOjAwLjAwMFoiLCJlbWFpbCI6ImFua2l0c2luZ2gwMDdAbWFpbGluYXRvci5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiY29tcGFueV9sb2dvIjpudWxsLCJhZGRyZXNzMSI6bnVsbCwiYWRkcmVzczIiOm51bGwsIm1vYmlsZSI6bnVsbCwic3RhdHVzIjoiYWN0aXZlIiwicm9sZSI6IndvcmtlciIsImFkbWluX2FwcHJvdmVkIjpudWxsLCJsYXN0X2xvZ2luIjpudWxsLCJpYXQiOjE2NTExNTQzNTYsImV4cCI6MTY1MTI0MDc1Nn0.a13jNTEzuhz3MAbtInzlPEmS-_iy52T4rKRhSXeHVIM";

export default axios.create({
  baseURL: "http://78.46.210.25:4243/",
  //baseURL: "https://shantiinfosoft.co:4243/",
});

export const auth = {
  headers: { Authorization: `${token}` },
};

//export const imageBase = "https://shantiinfosoft.co:4243/";
export const imageBase = "http://78.46.210.25:4243/";

export const workerImageBase =
  "http://78.46.210.25:4243/profile/profile_picture/";
