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

const getTableData = ({ current, pageSize }: Props): Promise<Result> => {
    let query = `page=${current}&size=${pageSize}`;

    return fetch(`https://randomuser.me/api?results=55&${query}`)
        .then((res) => res.json())
        .then((res) => ({
            total: res.info.results,
            list: res.results,
        }));
};

const CustomTable = () => {
    const { tableProps } = useAntdTable(getTableData);

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
                />
            </Col>
        </Row>
    );
};

export default CustomTable;
