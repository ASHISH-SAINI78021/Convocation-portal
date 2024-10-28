
import { Layout, Menu, Avatar, Tooltip, Button } from 'antd';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const items = new Array(2).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

const App = () => {
  const { setAuth } =  useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth((prev)=> {
      return {...prev , token : ""};
    });
    navigate("/");
  };

  return (
    <>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />

        {/* Avatar with Tooltip */}
        <Tooltip title="User Profile">
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" style={{ marginRight: 16 }} />
        </Tooltip>

        {/* Logout Button */}
        <Button  color="danger" onClick={handleLogout}>
          Logout
        </Button>
      </Header>
    </>
  );
};

export default App;
