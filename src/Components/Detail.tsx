import { Card, List, Image } from 'antd';
import { useRequest } from 'ahooks';
import axios from 'axios';

const appKey = {
    app_id: "igjdforswgxwmnvp",
    app_secret: "ekNiWThUVUszOUxqU1BPb013cUNCQT09"
};

const Detail = () => {
    const { data, loading, run } = useRequest(async (page: number = 1) => {
        const { data } = await axios.get(`https://www.mxnzp.com/api/image/girl/list?page=${page}&app_id=${appKey.app_id}&app_secret=${appKey.app_secret}`);
        if (data.code) {
            return data.data;
        }
    });

    const handleChange = (page: number) => {
        run(page);
    }

    return (
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
                        <Image width={'100%'} src={item?.imageUrl} />
                    </Card>
                </List.Item>
            )}
        />
    )
};

export default Detail;