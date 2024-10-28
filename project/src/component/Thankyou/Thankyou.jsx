
import { Result } from "antd";
const ThankYou = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Result
      status="success"
      title="Data submitted successfully"
      subTitle="Thankyou for your cooperation"
    />
  </div>
);
export default ThankYou;
