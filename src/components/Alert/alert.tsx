import React, { FC } from 'react'
import classNames from 'classnames';

export type AlterType = 'success' | 'primary' | 'default' | 'danger' | 'warning';

interface AlertProps {
    title: string;
    description?: string;
    closable?: boolean;
    customClose?: string;
    onClose?: () => void;
    className?: string;
    type: AlterType;
}

const Alert: FC<AlertProps> = (props) => {
    const { title, className, description, type = 'primary', closable } = props;
    const classes = classNames('alert', className, {
        [`alert-${type}`]: type,
    });

    return (
        <div className="modal">
            <div className={classes}>
                {title ? <h2 className="title">{title}</h2> : null}
                {description ? <p className="alert-message">{description}</p> : null}
                {closable ? <div className="window-close">关闭</div> : null}
            </div>
        </div>
    )
}

Alert.defaultProps = {
    closable: true,
    type: 'primary'
}

export default Alert;
