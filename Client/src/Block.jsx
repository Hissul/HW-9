import React from "react";

const Block = props => {
    const style = {
        left: `${props.block[0]}%`,
        top: `${props.block[1]}%`
    };

    return <div className="block" style={style} />
}

export default Block;