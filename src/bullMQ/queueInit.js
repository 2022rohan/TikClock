import { Queue,Worker } from "bullmq";
import conenction from "../redis_client.js";

const queue = new Queue("mainQueue", {connection: conenction});

export default queue;