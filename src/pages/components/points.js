
function Points(props) {
    const {data, xScale, yScale, height, width} = props;
    //Note: 
    //the if(data){...} means when data is not null, the component will return the points; otherwise, it returns <g></g>
    //we use the if ... else ... in this place so that the code can work with the SSR in Next.js;
    if(data){
        return <g>
        {/* task:1. remove this comments and put your code here */}

        </g>
    } else {
        return <g></g>
    }
}

export default Points