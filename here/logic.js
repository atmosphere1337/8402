let map = [[0,0,0,0],
           [0,8,4,0],
           [2,2,4,4],
           [2,0,2,4]];
map =     [[1024,1024,0,16],
           [4,2,128,4],
           [64,16,8,16],
           [2,8,2,64]];

map =       [[0,0,0,0],
             [0,0,0,0],
             [0,0,0,0],
             [0,2,0,0]];
var blank = [[0,0,0,0],
             [0,0,0,0],
             [0,0,0,0],
             [0,2,0,0]];
var current_score = 0;
var win = false;
var lose = false;
var buf4 = new Array(4);
function line( x )
{
    x = x.filter(x=>x!=0);
    out = new Array();
    for (let i = 0; i < x.length; i++)
    {
        if (x[i] == x[i+1])
        {
            x[i+1] = 2 * x[i+1];
            current_score += x[i+1];
            i++;
        }
        out.push(x[i]);
    }
    if (out.length < 4)
        out = out.concat(new Array(4-out.length).fill(0));
    return out;
}
function square(rotation)
{   
    switch (rotation)
    {
        case 1://  left
            for (i in map)
                map[i] = line(map[i]);
            break;
        case 2: // up
            for (i = 0; i < 4; i++)
            {
                buf = line([map[0][i], map[1][i], map[2][i], map[3][i]]);
                map[0][i] = buf[0];
                map[1][i] = buf[1];
                map[2][i] = buf[2];
                map[3][i] = buf[3];                
            }
            break;
        case 3: // right
            for (i in map)
                map[i] = line(map[i].reverse()).reverse(); // 
            break;
        case 4: // down
            for (i = 0; i < 4; i++)
            {
                buf = line([map[3][i], map[2][i], map[1][i], map[0][i]]);
                map[0][i] = buf[3];
                map[1][i] = buf[2];
                map[2][i] = buf[1];
                map[3][i] = buf[0];                
            }
            break;
        default:
            break;
    }
}
function spawn()
{
    let arr = [];
    let powers = [2,4,8,16];
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++)
        {
            if (map[i][j] == 0)
            {
                arr.push({"i" : i, "j" : j});
            } 
        }
    if (Math.random() < 0.5)
    {
        let point = arr[Math.floor(Math.random() * arr.length)];
        let pwr = powers[Math.floor(Math.random() * powers.length)];
        map[point.i][point.j] = pwr;
    }
}
spawn();


let field = [["dot1",  "dot2",  "dot3",   "dot4"],
             ["dot5",  "dot6",  "dot7",   "dot8"],
             ["dot9",  "dot10", "dot11", "dot12"],
             ["dot13", "dot14", "dot15", "dot16"]];

function print_field(field, document)
{
    for (let i = 0; i < 4; i++)                
        for (let j = 0; j < 4; j++)
        {
            let el = document.getElementById(field[i][j]); 
            if (map[i][j] == 0)
                el.style.backgroundColor = "gray";
            if (map[i][j] == 2 || map[i][j] == 4)
                el.style.backgroundColor = "white";
            if (map[i][j] == 8 || map[i][j] == 16)
                el.style.backgroundColor = "yellow";
            if (map[i][j] == 32 || map[i][j] == 64)
                el.style.backgroundColor = "orange";
            if (map[i][j] == 128 || map[i][j] == 256)
                el.style.backgroundColor = "brown";
            if (map[i][j] == 512 || map[i][j] == 1024 || map[i][j] == 2048)
                el.style.backgroundColor = "red";
            if (map[i][j] >= 100)
                el.style.fontSize = "300%";//300%
            if (map[i][j] >= 1000)
                el.style.fontSize = "200%";//200%
            if (map[i][j] < 100 )
                el.style.fontSize = "400%";//400%
            el.innerText = (map[i][j] == 0)? "" : map[i][j];
        }
}                

print_field(field, document);

document.addEventListener('keypress', 
(event) => 
{
   var code = event.code;
   let buf = JSON.parse(JSON.stringify(map));
   if (code == "KeyW")
   {
       square(2);
   }
   if (code == "KeyS")
   {
       square(4);
   }
   if (code == "KeyA")
   {
       square(1);
   }
   if (code == "KeyD")
   {
       square(3);
   }
   if ((JSON.stringify(buf) != JSON.stringify(map)) && (code == "KeyW" || code == "KeyS" || code == "KeyA" || code == "KeyD"))
   {
       spawn();
       print_field(field, document);
       document.getElementById("score_val").innerHTML = current_score;
       if (map.reduce((acc, x)=>acc.concat(x)).includes(2048))
       {
           alert("you won! :)");
           map = JSON.parse(JSON.stringify(blank)); 
           print_field(field, document);
           current_score = 0;
           document.getElementById("score_val").innerHTML = current_score;
       }
       return;
   }
   if (!map.reduce((acc, x)=>acc.concat(x)).includes(0) && (code == "KeyW" || code == "KeyS" || code == "KeyA" || code == "KeyD"))
   {
       buf = JSON.parse(JSON.stringify(map));
       for (let i = 1; i <= 4; i++) 
       {
           square(i);            
           buf4[i - 1] = JSON.parse(JSON.stringify(map));
           map = JSON.parse(JSON.stringify(buf)); 
       }
       if (JSON.stringify(buf4[0]) == JSON.stringify(buf4[1]) && JSON.stringify(buf4[1]) == JSON.stringify(buf4[2]) && JSON.stringify(buf4[2]) == JSON.stringify(buf4[3]) )
       {
           alert("you lost! :(");
           map = JSON.parse(JSON.stringify(blank)); 
           print_field(field, document);
           current_score = 0;
           document.getElementById("score_val").innerHTML = current_score;
       }
   }
}
, false);



function restart()
{
    map = JSON.parse(JSON.stringify(blank)); 
    print_field(field, document);
    current_score = 0;
    document.getElementById("score_val").innerHTML = current_score;
}