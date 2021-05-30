const fontWeight = {
    Thin: 100,
    ExtraLight: 200,
    Light: 300,
    Regular:  400,
    Medium: 500,
    SemiBold: 600,
    Bold: 700,
    ExtraBold: 800,
    Black: 900,
    ExtraBlack: 950
}
   
const fontParam = (value) => {
    let arr = value.split("-");
    if(arr[1] === 'Italic') {
        arr[1] = "Regular";
        arr.push("Italic");
    }else {
        if(arr[1].search("Italic") != -1) {
            const newItem = arr[1].replace("Italic","");
            arr.pop();
            arr.push(newItem, "Italic");
        }else {
            arr.push("normal");
        }
    }
    return obj = {
        arr: arr
    };
}

const fontsStyle = () => {
const fileContent = fs.readFileSync(path.resolve(__dirname, 'resources') + '/sass/fonts.scss');
    fs.writeFile(path.resolve(__dirname, 'resources') + '/sass/fonts.scss', '', cb);
    fs.appendFile(
        path.resolve(__dirname, 'resources') + '/sass/fonts.scss',
        '@use "1-abstracts/fontFace";\r\n', cb
    );
    return fs.readdir(path.resolve(__dirname, 'resources') + '/fonts', (err, items) => {
        if(items) {
            let c_fontName;
            for(let i = 0; i < items.length; i++) {
                let fontName = items[i].split('.');
                fontName = fontName[0];
                if(c_fontName != fontName) {
                    font = fontParam(fontName);
                    fs.appendFile(
                        path.resolve(__dirname, 'resources') + '/sass/fonts.scss', 
                        '@include fontFace.font("' + font.arr[0] + '", "' + fontName + '", "'+ fontWeight[font.arr[1]]  +'", "'+ font.arr[2] +'");\r\n', 
                        cb)
                }
                c_fontName = fontName;
                
            }
        }
           
    })
}

const cb = () => {};

