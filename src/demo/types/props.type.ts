// props.type.ts

interface InputSetting {
    placeholder?: string;
    maxlength?: number;
}

export class TodoInputProps {
    public handleSubmit: ((value: string) => void) | undefined;
    public inputSetting?: InputSetting = {
        maxlength: 20,
        placeholder: '请输入todo'
    }
}
