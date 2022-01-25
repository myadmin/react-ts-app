import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import Player from '../Pages/player';
import List from '../Pages/list';

const { Content, Sider } = Layout;

const Music = () => {
    let navigate = useNavigate();
    const handleClick = ({ key }: any) => {
        console.log('key', key);
        switch (key) {
            case '1':
                navigate(`/music/player`);
                break;
            case '2':
                navigate(`/music/list`);
                break;
            default:
                break;
        }

    }

    return (
        <div className="container">
            <Layout style={{ minHeight: '100vh' }}>
                {/* 左侧菜单 */}
                <Sider collapsible>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" onClick={handleClick}>
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            音乐播放器
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            音乐列表
                        </Menu.Item>
                    </Menu>
                </Sider>

                {/* 右侧内容 */}
                <Layout className="site-layout">
                    <Content>
                        {/* 路由跳转 */}
                        {/* <Routes>
                            <Route path="/music/player" element={<Player />} />
                            <Route path="/music/list" element={<List />} />
                        </Routes> */}
                        <Player />
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
};

export default Music;
