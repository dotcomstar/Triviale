import axios from "axios";

export default axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ??
    "https://us-west-2.aws.data.mongodb-api.com/app/data-xenan/endpoint",
});
