import { Oval } from "react-loader-spinner";

export default function Loading() {
  return (
    <Oval
      height={80}
      width={80}
      color="#76a5c2"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#76a5c2"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
}
