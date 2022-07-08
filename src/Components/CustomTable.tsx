import { Table, Row, Col } from "antd";
import { useAntdTable } from "ahooks";

interface Item {
    name: {
        last: string;
    };
    email: string;
    phone: string;
    gender: "male" | "female";
}

interface Result {
    total: number;
    list: Item[];
}

interface Props {
    current: number;
    pageSize: number;
}

const CustomTable = () => {
    const { loading, tableProps } = useAntdTable(
        async ({ current, pageSize }: Props): Promise<Result> => {
            let query = `page=${current}&size=${pageSize}`;
            return new Promise((resolve) => {
                fetch(`https://randomuser.me/api?results=55&${query}`)
                    .then((res) => res.json())
                    .then((res) => {
                        return resolve({
                            total: res.info.results,
                            list: res.results
                        });
                    });
            });
        },
    );

    const columns = [
        {
            title: "name",
            dataIndex: ["name", "last"],
        },
        {
            title: "email",
            dataIndex: "email",
        },
        {
            title: "phone",
            dataIndex: "phone",
        },
        {
            title: "gender",
            dataIndex: "gender",
        },
    ];

    return (
        <Row>
            <Col span={24}>
                <Table
                    style={{ margin: '20px' }}
                    bordered
                    size="small"
                    columns={columns}
                    rowKey="email"
                    {...tableProps}
                    scroll={{ y: `calc(100vh - 136px)` }}
                    loading={loading}
                />
            </Col>
        </Row>
    );
};

export default CustomTable;
