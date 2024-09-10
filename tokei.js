// 時計を描画する関数
function drawClock() {
    // キャンバス要素を取得
    let canvas = document.getElementById('clockCanvas');
    if (!canvas) {
        console.error('Canvas element not found'); // エラーメッセージをコンソールに出力
        return;
    }
    // キャンバスのコンテキストを取得
    let ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Failed to get canvas context'); // エラーメッセージをコンソールに出力
        return;
    }
    // キャンバスの半径を設定
    let radius = canvas.height / 2;
    ctx.translate(radius, radius); // キャンバスの中心を原点に設定
    let reducedRadius = radius * 0.9;

    // 時計を更新する関数
    function updateClock() {
        ctx.clearRect(-radius, -radius, canvas.width, canvas.height); // 画面をクリア
        drawFace(ctx, reducedRadius); // 文字盤を描画
        drawNumbers(ctx, reducedRadius); // 数字を描画
        drawTime(ctx, reducedRadius); // 時刻を描画
        drawDate(ctx, reducedRadius); // 日付を描画
        drawDayOfWeek(ctx, reducedRadius); // 曜日を描画
        drawDigitalTime(ctx, reducedRadius); // デジタル時刻を描画
    }

    // 初期描画
    updateClock();

    // 毎秒 updateClock 関数を実行
    setInterval(updateClock, 1000);
}

// 文字盤を描画する関数
function drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI); // 円を描く
    ctx.fillStyle = '#81D8D0'; // 塗りつぶしの色を設定
    ctx.fill();
    ctx.strokeStyle = 'darkgray'; // 線の色を設定
    ctx.lineWidth = radius * 0.03; // 線の幅を設定
    ctx.stroke();
}

// 数字を描く関数
function drawNumbers(ctx, radius) {
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for (let num = 1; num <= 12; num++) {
        let angle = (num * Math.PI) / 6; // 角度を計算
        let x, y;
        if (num === 12 || num === 3 || num === 6 || num === 9) {
            x = radius * 0.8 * Math.cos(angle - Math.PI / 2);
            y = radius * 0.8 * Math.sin(angle - Math.PI / 2);
            ctx.font = radius * 0.3 + 'px sans-serif'; // 大きなフォントサイズ
        } else {
            x = radius * 0.83 * Math.cos(angle - Math.PI / 2);
            y = radius * 0.83 * Math.sin(angle - Math.PI / 2);
            ctx.font = radius * 0.15 + 'px sans-serif'; // 通常のフォントサイズ
        }
        ctx.fillStyle = '#000'; // テキストの色を設定
        ctx.fillText(num.toString(), x, y); // 数字を描く
    }
}

// 時刻を描く関数
function drawTime(ctx, radius) {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    let timeString = formatTime(hour) + ':' + formatTime(minute) + ':' + formatTime(second);
    console.log(timeString); // コンソールに時刻を出力

    // 各針の角度を計算
    let hourAngle = ((hour % 12) + minute / 60) * (Math.PI / 6);
    drawHand(ctx, hourAngle, radius * 0.5, radius * 0.07); // 時針を描く

    let minuteAngle = (minute + second / 60) * (Math.PI / 30);
    drawHand(ctx, minuteAngle, radius * 0.8, radius * 0.07); // 分針を描く

    let secondAngle = second * (Math.PI / 30);
    drawHand(ctx, secondAngle, radius * 0.9, radius * 0.02, 'red'); // 秒針を描く
}

// 時刻をフォーマット（2桁表示にする）する関数
function formatTime(value) {
    return ('0' + value).slice(-2);
}

// 時計の針を描く関数
function drawHand(ctx, angle, length, width, color) {
    if (color === undefined) color = '#333'; // 色が指定されていない場合は黒を使用
    ctx.beginPath(); // 新しいパスの開始
    ctx.lineWidth = width; // 線の幅を設定
    ctx.lineCap = 'round'; // 線の端を丸くする
    ctx.strokeStyle = color; // 線の色を設定
    ctx.moveTo(0, 0); // パスの開始点を中心に設定
    ctx.rotate(angle); // キャンバスの座標系を回転
    ctx.lineTo(0, -length); // パスを描画
    ctx.stroke(); // パスを描画
    ctx.rotate(-angle); // 座標系を元に戻す
}

// 日付を描く関数
function drawDate(ctx, radius) {
    let now = new Date();
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month = months[now.getMonth()];
    let day = now.getDate();
    let dateString = month + ' ' + day;

    ctx.font = radius * 0.1 + 'px sans-serif';
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    let x = radius * 0.8 * Math.cos(-Math.PI / 2);
    let y = radius * 0.8 * Math.sin(-Math.PI / 2) + radius * 0.25;

    ctx.fillText(dateString, x, y); // 日付を描く
}

// 曜日を描く関数
function drawDayOfWeek(ctx, radius) {
    let now = new Date();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayOfWeek = days[now.getDay()];
    let colors = ['darkslategray', 'darkorange', 'crimson', 'blue', 'green', 'deeppink', 'navy']; // 曜日によって文字の色を変える
    let dayColor = colors[now.getDay()];

    ctx.font = radius * 0.1 + 'px sans-serif';
    ctx.fillStyle = dayColor;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    let x = radius * 0.8 * Math.cos((6 * Math.PI) / 6 - Math.PI / 2);
    let y = radius * 0.8 * Math.sin((6 * Math.PI) / 6 - Math.PI / 2) - radius * 0.25;

    ctx.fillText(dayOfWeek, x, y); // 曜日を描く
}

// デジタル時刻を描く関数
function drawDigitalTime(ctx, radius) {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    let timeString = formatTime(hour) + ':' + formatTime(minute) + ':' + formatTime(second);

    ctx.font = radius * 0.2 + 'px sans-serif';
    ctx.fillStyle = '#FFF';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    let x = 0;
    let y = -radius * 0.3; 

    ctx.fillText(timeString, x, y); // デジタル時刻を描く
}

// 時計を描画する関数を呼び出す
drawClock();
