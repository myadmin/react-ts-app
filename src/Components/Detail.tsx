import { Card, List, Image } from 'antd';
import { useRequest } from 'ahooks';
import axios from 'axios';

const appKey = {
    app_id: "igjdforswgxwmnvp",
    app_secret: "ekNiWThUVUszOUxqU1BPb013cUNCQT09"
};

const instance = axios.create({
    baseURL: 'https://www.mxnzp.com/api',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    }
});

const Detail = () => {
    const { data, loading, run } = useRequest(async (page: number = 1) => {
        const { data } = await instance(`/image/girl/list`, {
            params: {
                page,
                app_id: appKey.app_id,
                app_secret: appKey.app_secret
            }
        });
        if (data.code) {
            return data.data;
        }
    });

    const handleChange = (page: number) => run(page);

    return (
        <Image.PreviewGroup>
            <List
                style={{ padding: '20px' }}
                grid={{ gutter: 20, column: 5 }}
                loading={loading}
                dataSource={data?.list}
                pagination={{
                    total: data?.totalCount,
                    current: data?.page,
                    showSizeChanger: false,
                    onChange: handleChange
                }}
                renderItem={(item: any) => (
                    <List.Item>
                        <Card>
                            <Image width={'100%'} src={item?.imageUrl.replace('https', 'http')} />
                        </Card>
                    </List.Item>
                )}
            />
        </Image.PreviewGroup >
    )
};

export default Detail;
