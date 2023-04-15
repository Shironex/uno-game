function colorPrint(TagColor: number, DescColor: number, tag: string, message: string ) {
    return console.log('\u001b[' + TagColor + 'm' + `[${tag}] ` + '\u001b[0m' + '\u001b[' + DescColor + 'm' +`${message}`+ '\u001b[0m');
};

export default colorPrint;