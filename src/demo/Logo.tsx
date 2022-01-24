import * as React from "react";

interface IProps {
    /**
     * logo的地址
     */
    logo?: string;
    className?: string;
    alt?: string;
}

/**
 * logo
 * @returns dom
 */
const Logo: React.FC<IProps> = (props) => {
    const { logo, className, alt } = props;
    // console.log("props", props);

    return <img src={logo} className={className} alt={alt} />;
};

export default Logo;
