import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const RESULT = ({batch , rollNumber}) => {
    const navigate = useNavigate();
return (
  <Result
    status="success"
    title="Successfully Verified"
    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
      <Button type="primary" key="console" onClick={()=> navigate(`/dashboard/main/${batch}/${rollNumber}/form` , {state : {rollNumber : rollNumber , batch}})} >
        Next step
      </Button>,
    ]}
  />
);
}
export default RESULT;