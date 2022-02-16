import mongoose from "mongoose";

var uri = `url do mongodb atlas`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(uri, options).then(
  () => {
    console.log("Database connection established!");
  },
  (err: any) => {
    {
      console.log("Error connecting Database instance due to:", err);
    }
  }
);
