import { useParams } from "react-router-dom";

const ShowPost = () => {
  const param = useParams();
  console.log(param);
  return <div>ShowPost</div>;
};

export default ShowPost;
