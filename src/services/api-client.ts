import axios from "axios";

export default axios.create({
  baseURL: "https://us-west-2.aws.data.mongodb-api.com/app/data-xenan/endpoint",
});
