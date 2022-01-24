import * as React from "react";
import { TodoInputProps } from "./types/props.type";

const todoInputDefaultProps = {
    inputSetting: {
        maxLength: 20,
        placeholder: "请输入todo",
    },
};

type Props = {
    handleSubmit: (value: string) => void;
    children: React.ReactNode;
} & Partial<typeof todoInputDefaultProps>;

interface State {
    itemText: string;
}

class ToDoInput extends React.Component<TodoInputProps, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            itemText: "",
        };

        this.updateValue = this.updateValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public static defaultProps = todoInputDefaultProps;

    private inputRef = React.createRef<HTMLInputElement>();

    private updateValue(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ itemText: e.target.value });
    }

    private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!this.state.itemText.trim()) {
            return;
        }

        this.props.handleSubmit && this.props.handleSubmit(this.state.itemText);
        this.setState({ itemText: "" });
    }

    public render() {
        const { itemText } = this.state;
        const { updateValue, handleSubmit } = this;
        const { inputSetting } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <input
                    maxLength={inputSetting?.maxlength}
                    type={"text"}
                    ref={this.inputRef}
                    value={itemText}
                    onChange={updateValue}
                />
                <button type="submit">添加todo</button>
            </form>
        );
    }
}

export default ToDoInput;
