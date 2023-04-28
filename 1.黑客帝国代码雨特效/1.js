// 要操作的画布
const canvas = document.querySelector('canvas')

// 画布的上下文(准备画笔（获取上下文对象）：canvas.getContext(“2d”);)
// 画笔就是context对象，context对象也被称为绘制环境，通过该对象，可以在画布中绘制图形。
const context = canvas.getContext('2d')

// 初始化画布宽高
function init() {
    canvas.height = window.innerHeight * devicePixelRatio // innerHeight表示窗口内容区域的高度，不包括边框、菜单栏
    canvas.width = window.innerWidth * devicePixelRatio // devicePixelRatio (设备像素比)
}
init()

// 根据设备像素比来设置字体大小  
const fontSize = 20 * devicePixelRatio
// 设置字体，字体大小（和css设置字体一样）
context.font = `${fontSize}px "Consolas"`;
// 计算总列数 fontSize相当于每列的宽度
const columnCount = Math.floor(canvas.width / fontSize)
// 根据列数创建数组并填充为0
const charIndex = new Array(columnCount).fill(0)

function draw() {
    // 加个渐隐效果
    context.fillStyle = 'rgba(0,0,0,0.1)';// fillStyle 属性设置或返回用于填充绘画的颜色、渐变或模式。

    context.fillRect(0, 0, canvas.width, canvas.height); // 绘制“已填色”的矩形。默认的填充颜色是黑色 (x,y,width,height)
    context.fillStyle = '#6be445';// fillStyle 属性设置或返回用于填充绘画的颜色、渐变或模式。
    // 设置文本基线为顶部
    context.textBaseline = 'top';
    for (let i = 0; i < columnCount; i++) {
        // 获取随机字符
        const text = getRandomChar();
        // 计算文字的x、y坐标
        const x = i * fontSize;
        const y = charIndex[i] * fontSize;
        // 绘制文本
        context.fillText(text, x, y);// 在指定的位置填充指定的文本 四个参数依次为：填充的文本、起点x轴坐标、起点y轴坐标、最大宽度
        // 超出画布归零
        // 这里需要再加个判断，使之错开归零的时间点（Math.random()>0.99）
        if (y > canvas.height && Math.random() > 0.99) {
            charIndex[i] = 0;
        } else {
            charIndex[i]++;
        }
    }
}
// 开始绘制
draw();
// 每个50毫秒绘制一次
setInterval(draw, 50);

// 获取随机字符
function getRandomChar() {
    const str = '@#¥%……&&*abcdefghijklmnopqrstuvwxyz';
    return str[Math.floor(Math.random() * str.length)];
}