

function Message(){
    const name = 'a';
    if(name)
        return <h1>Hello {name}</h1>;  //jsx: JavaScript XML

    return <h1>Hello World</h1>;
}


export default Message;