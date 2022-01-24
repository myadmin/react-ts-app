// import Button, { ButtonSize, ButtonType } from './components/Button/button';
// import Alert from './components/Alert/alert';
// import './styles/index.scss';
import MyEventEmitter from './MyEventEmitter';
import A from './A';
import B from './B';
window.myEvent = new MyEventEmitter();

function App() {
    // const testHandler = function (params: string) {
    //     console.log(`test事件被触发了\n\rtestHandler接收到的入参是:${params}`);
    // };
    // myEvent.on('test', testHandler);
    // myEvent.emit('test', 'this is my event handler');
    // myEvent.off('test', testHandler);
    // console.log('myEvent', myEvent);
    // myEvent.emit('test', '123');
    return (
        <>
            {/* <Button className='abs'>Hello</Button>
            <Button disabled>Disabled Button</Button>
            <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
                Large Primary
            </Button>
            <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
                Small Danger
            </Button>
            <Button btnType={ButtonType.Link} href='http://www.baidu.com' target="_blank">
                Baidu Link
            </Button>
            <Button btnType={ButtonType.Link} href='http://www.baidu.com' disabled>
                Disabled Link
            </Button> */}

            {/* <Alert type='success' title='这是Alert组件' /> */}
            {/* <Alert type='success' title='这是Alert组件' description='这是组件的内容' /> */}
            <B />
            <A />
        </>
    );
}

export default App;
