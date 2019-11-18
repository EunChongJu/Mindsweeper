/* 
 * 이 파일은 mindsweeper2.js를 임포트하여 이를 GUI에 직접 구현할 수 있도록 한다.
 * (mindsweeper2.js는 GUI에 구현할 수 있는 라이브러리라고 했지, 구현할 수 있다고는 안했다)
 * 
 * mindsweeper2를 줄여서 md2라 한다.
 * 이것은 사실상 md2와 GUI가 분리된 것을 하나로 이어주는 것이 game.js이다.
 * 
 * 실행순서는 다음과 같다.
 * 1. 먼저 사용자가 난이도를 선택한다. (또는 직접 옵션(자기가 원하는 사이즈 및 갯수)을 실행한다.)
 * 2. md2의 생성자를 만든다.
 * 3. md2에 사용자가 선택한 사이즈와 갯수를 맞춰 생성(하면서 모든 값을 0으로 설정)한다. (아직 지뢰 배치는 이르다)
 * 4. (GUI) 사용자에게 생성된 맵을 보여준다.
 * 5. 사용자가 아무나 클릭하면 그 좌표를 알아내 md2에 좌표값을 넘긴다.
 * 6. md2는 좌표값을 받아 이 주변지역(5x5)을 배치금지구역으로 지정한다.
 * 7. 그리고 지뢰를 랜덤으로 배치한다. (지뢰가 이미 배치된 곳에 배치되지 않도록 한다.)
 * 8. 배치 완료되면 사용자가 클릭했던 좌표값의 주변지역에 배치금지구역을 해제(하고 0으로 설정)한다.
 * 9. 그리고 클릭했던 좌표값에 실행을 시작한다. (클릭한 곳이 0이 없어질 때까지, 그리고 0을 제외한 숫자가 나올 때까지 확산한다. 이에 대해 지뢰찾기 게임을 직접 하면서 생각해 보도록, 더이상 설명은 생략한다.)
 * 10. 게임을 실행하면서 지뢰가 있다고 생각해서 우클릭하면 좌표값을 깃발로 표시된다. (이때, 깃발이 지뢰위치가 저장된 맵에는 영향을 받지 않고, 이 md2의 게임실행전용 클래스에 저장된다.)
 * 11. 실행하면서 깃발을 우클릭하면 깃발이 해지되고 물음표가 표시된다. (이것 역시 지뢰맵에 영향을 주지 않고, md2의 게임실행전용 클래스에 저장된다.)
 * 12. (GUI) 사용자가 클릭한 좌표가 발생하면, 이 좌표를 md2가 받아서 판정한다. 판정 과정은 받은 좌표를 맵의 이 좌표 값을 읽어서 이 값에 따라 실행된다.
 * 13. 좌표값이 0이라면 주변 값을 읽어내서 지뢰를 제외한 0이나 숫자가 드러낼 때까지 확장한다. (지뢰게임 하면서 참고)
 * 14. 좌표값이 숫자라면 확장을 하지 않고 이 숫자를 반환하여 GUI에 표시한다.
 * 15. 좌표값이 지뢰라면 터지는 함수를 실행한다. 터지는 함수는 아래의 사용방법 설명란과 같다.
 * 16. 깃발을 제외한 모든 곳을 다 열어본다면, 성공 함수를 실행하도록 한다.
 * 17. 성공하고 나면 md2의 생성자 실행이 종료되고, 결과를 보여준뒤, 리플레이 여부를 묻는다.
 * 18. 리플레이 여부에 따라 생성하거나 종료하거나 둘중 하나.
 * 
 * 게임 실행하면서 사용하는 방법은 다음과 같다.
 * 1. 지뢰가 있다고 생각되는 곳에 마우스 우클릭을 하면 깃발이 나온다. 깃발은 우클릭이 불가능하다.
 * 2. 깃발을 한번 더 우클릭하면 물음표가 뜬다. 물음표는 클릭이 가능하다.
 * 3. 클릭한 곳이 지뢰가 없는 곳(지뢰를 제외한, 0이거나 숫자거나)이라면 0이면 확장하고, (0을 제외한)숫자면 확장하지 않고 그대로 표시한다.
 * 4. 클릭한 곳이 지뢰가 있는 곳이라면 다음 터지는 함수를 실행한다.
 * 5. 터지기 함수를 실행하기 시작하고, 터질 때 게임실행전용 클래스의 값을 읽어 지뢰와 깃발 좌표값이 일치하면 터지지 않고, 깃발이 헛발질(불일치)하면 그 자리에 X표시로 바꾸고, 지뢰가 깃발 아래에 있지 않다면(불일치) 이 지뢰는 터지게 한다.
 * 6. 터질 때, 순차적으로 한 칸씩 나아가며 표시한다.
 * 7. 지뢰를 예측하면서 깃발을 배치할 때마다 깃발의 갯수가 줄어들도록 한다. (깃발이 -1 이하로 내려가는 수가 있다.)
 * 8. 지뢰를 제외한 모든 칸을 열어본다면(클릭한다면) 성공했다는 표시가 나오도록 성공함수를 실행한다. (성공함수는 그냥 성공했다는 것을 보여주는 쇼로, 그냥 지뢰 예측이 맞았음을 지뢰 칸을 열어 지뢰를 보여주고 성공하셨습니다하고, 끝.)
 * 9. 끝나면 결과를 보여준다.
 * 10. 결과를 보여주는 동시에 클라이언트에 결과가 저장된다. (Web Storage를 이용)
 * 
 * 
 */

//// 알고리즘에 기반이 되는 핵심 함수들

var md2 = null;	// 생성자. 비효율을 막기 위해 startApp()이 실행될 때 만 생성하도록 함.
var clickFirst = false;	// 처음 클릭했었나? -> 클릭 한번 이상 했다면 true로 바뀐다.
var pointWin = false;	// 이 상태로 게임오버를 실행하면 패로 등록되지만, true로 하면 승리한다.
var flagMap = null;	// 플래그 맵 : 깃발 꽂고 빼고 물음표 배치하는 것을 저장하는 맵이다.
var flagNum = 0;

// onload를 통해 맨 처음 실행되는 함수
function startApp() {
	md2 = new MD();
	
	document.getElementById('front').style.display = 'block';
}

// 게임 맵 설정을 끝내고 Start버튼 누를 때 실행되는 함수 : 맵 생성, 플래그맵 생성
function clickStartBtn() {
	// 프론트 디스플레이를 숨기고 다음 단계인 맵 형성하는 함수에 넘긴다.
	document.getElementById('front').style.display = 'none';
	
	// 시작할 때 사용자가 지정한 속성값을 불러온다.
	var attr = setMapAttr();
	
	// 클래스에 맵을 생성한다.
	md2.start(attr.width, attr.height, attr.number);
	
	// 플래그 맵을 생성한다.
	flagMap = newTwiceArray(attr.width, attr.height);
	
	// 디스플레이에 보여줄 맵을 만들어 띄운다.
	showGameMain(attr.width, attr.height);
	
	// 모든 셀을 한꺼번에 이벤트리스너를 관리
	var allMapCell = document.querySelector("#gt");
	allMapCell.addEventListener("mousedown", cellClickActive, false);
}

// front 화면을 숨기고 메인을 보여줘야지
function showGameMain(w,h) {
	document.getElementById('game').innerHTML = setGameMapCell(w,h);	// 셀맵을 띄운다.
	document.getElementById('wrap').style.display = 'block';	// 메인을 보여준다.
}

// 게임오버 화면 실행
function showGameOver() {
	document.getElementById('wrap').style.display = 'none';	// 메인을 감춘다.
	document.getElementById('back').style.display = 'block';	// 게임오버 화면을 보여준다.
	showScore();
}

// 게임 점수 화면 보여준다.
function showScore(){
	document.getElementById('score').style.display = 'block';
	showResult();
}

// 게임오버 창에 넥스트 버튼을 클릭 시 실행하는 함수
function nextShow() {
	var code = 0 + pointWin;	// 승패여부 코드 : false면 0, true면 1
	
	document.getElementById('score').style.display = 'none';
	switch (code) {
		case 0:
			document.getElementById('lose').style.display = 'block';
			break;
		case 1:
			document.getElementById('win').style.display = 'block';
			break;
	}
}




// 비동기식 핵심 함수들

// 우측 클릭 방지 : 기본값 : 게임에 집중하기 위함
window.oncontextmenu = function () {
	return false;
};

// 모든 셀을 통틀어 클릭을 감지하는 함수
function cellClickActive(e) {
    if (e.target !== e.currentTarget) {
        var cell = e.target.id;
		
		// 앞에 c가 붙지 않은 아이디 값을 걸러낸다. (좌표 아이디는 c로 시작한다.)
		if (cell.charAt(0) == 'c') {
			// 아이디 값을 좌표값으로 전환.
			var at = convertCoordinateValues(cell);
			var x = at.x, y = at.y;
			
			//마우스 우클릭, 좌클릭에 따라 구분하도록 함. (여기서는 함수 써라 제발;;)
			
			if (e.button == 0) {	// 좌클릭
				// 원래 우클릭하고 disabled을 통해 좌클릭 못하게 할려고 했는데 반전, 우클릭이 안되서 이 구문을 추가.
				if (flagMap[x][y] != 1) {
					// Style Setting
					document.getElementById(cell).style.backgroundColor = 'white';
					
//					console.log("["+x+","+y+"] Left Click");
					clickLeft(x,y);
				}
			}
			else if (e.button == 2) {	//우클릭
//				console.log("["+x+","+y+"] Right Click");
				clickRight(x,y);
			}
			else {
				return;
			}
		}
    }
    e.stopPropagation();
}

// 좌클릭 시 실행되는 함수
function clickLeft(x,y) {
	// 만약 한번도 클릭한 적이 없다면 : 
	if (!clickFirst) {
		md2.clickFirst(x,y);
		nullExpansion(x,y);
		clickFirst = true;
	}
	else {	// 한번 이상 클릭했으면 : 
		var id = "c" + fitToNumUnit(x, 2) + fitToNumUnit(y, 2);
		var cell = document.getElementById(id);
		
		// 클릭한 셀의 값에 따라 표시되고 승패를 좌지우한다.
		var value = md2.click(x,y);
		
		if (value == -1) {
			// 꾹ㅡ 어..? 방금 뭐 누른..거야?
			touchMine(x,y);
		}
		else if (value == 0) {
			cell.innerHTML = '';
			
			// 주변에(지뢰를 제외한)숫자가 나올 때까지 들춰내는 함수를 실행한다.
			nullExpansion(x,y);
		}
		else if (value > 0) {
			cell.innerHTML = '' + value;
			// 근데 문제는 셀 버튼의 색상이 화이트다. 즉, 안보인다. 이에 대해 클래스 이름 추가로 색상이 보이게끔 한다.
			showNumber(cell, value);
		}
		cell.disabled = true;
	}
}

// 우클릭 시 실행되는 함수
function clickRight(x,y) {
	var flag = flagAt(x,y);
	
	var id = "c" + fitToNumUnit(x, 2) + fitToNumUnit(y, 2);
	var cell = document.getElementById(id);
	
	switch(flag) {
		case 0:		// 비어있다면 깃발을 배치
			flagMap[x][y]++;
			cell.innerHTML = '🚩';
			flagNum++;
			break;
		case 1:		// 깃발이 있으면 없애고 물음표 배치
			flagMap[x][y]++;
			cell.innerHTML = '?';
			flagNum--;
			break;
		case 2:		// 물음표 있으면 아예 비운다.
			flagMap[x][y] = 0;
			cell.innerHTML = '';
			break;
	}
	
	// 오른쪽 버튼 클릭할 때마다 승리여부를 체크한다.
	var num = parseInt(document.getElementById('number').value);
	if (flagNum == num) {
		checkWin(num);
	}
}

// 깃발이 있는 위치와 지뢰가 있는 위치가 일치한지 체크한다.
function checkWin(num) {
	var matchNum = 0;
	var attr = md2.attr;
	
	for (var i = 0; i < attr.width; i++) {
		for (var j = 0; j < attr.height; j++) {
			if (md2.map[i][j] == -1 && flagMap[i][j] == 1) {
				matchNum++;
			}
		}
	}
	
	if (matchNum === num) {
		pointWin = true;
		
		for (var i = 0; i < attr.width; i++) {
			for (var j = 0; j < attr.height; j++) {
				if (md2.map[i][j] == -1) {
					showMine(i,j);
				}
			}
		}
		setTimeout(function() {
			showGameOver();
		}, 3000);
	}
	else {
		console.log("틀림"+ matchNum +" " + num);
	}
}

// 지뢰 공개
function showMine(x,y) {
	var id = "c" + fitToNumUnit(x, 2) + fitToNumUnit(y, 2);
	var cell = document.getElementById(id);
	
	cell.style.backgroundColor = "blue";
	setTimeout(
		function() {
			cell.style.backgroundColor = "cyan";
		}, 3000
	)
}


//// 라이브러리 함수들

// Easy, Middle, Hard 버튼을 클릭할 때마다 input에 값을 바꿔보여줌
function gameLevel(lv) {
	var attr = sizeofLevel(lv);
	
	document.getElementById('width').value = attr.w;
	document.getElementById('height').value = attr.h;
	document.getElementById('number').value = attr.n;
}

// 난이도에 따라 값을 반환해 줌
function sizeofLevel(lv) {
	var attr;
	switch(lv) {
		case 1:
			attr = {w: 9, h: 9, n:10};
			break;
		case 2:
			attr = {w: 16, h: 16, n: 40};
			break;
		case 3:
			attr = {w: 30, h: 16, n: 99};
			break;
	}
	return attr;
}

// 사용자가 임의로 지정했을수도 있으니; input값을 불러온다.
function setMapAttr() {
	var width = document.getElementById('width').value;
	var height = document.getElementById('height').value;
	var number = document.getElementById('number').value;
	
	return {width: width, height: height, number: number};
}

// 받은 인자를 통해 만들어서 생성된 지뢰 맵을 디스플레이에 표시된다.
function setGameMapCell(w,h) {
	var line = '<div class="gt" id="gt">';
	
	for (var j = 0; j < h; j++) {
		line += '<div class="gt-row">';
		for (var i = 0; i < w; i++) {
			// 만약 수가 10의 단위가 아니라면 (예를 들어 1자리수라면 앞에 0을 채움)
			var x = fitToNumUnit(i, 2);
			var y = fitToNumUnit(j, 2);
			
			line += '<button class="gt-cell" id="c' + x + y + '"></button>';
		}
		line += '</div>';
	}
	line += '</div>';
	
	return line;
}

// 좌표값을 아이디 값에 적용되도록 값을 바꾼다.
function fitToNumUnit(i,n) {
	var str = "0000000000" + i;
	return str.slice(-n);
}

// 아이디 값을 좌표값으로 바꿔준다.
function convertCoordinateValues(id) {
	var x = parseInt(id.substr(1,2));
	var y = parseInt(id.substr(3,2));
	
	return {x: x, y: y};
}

// return value that value of coordinate
function flagAt(x,y) {
	return flagMap[x][y];
}

// 숫자를 표시하기 위한 함수
function showNumber(id, value) {
	switch(value) {
		case 1:
			id.classList.add("v1");
			break;
		case 2:
			id.classList.add("v2");
			break;
		case 3:
			id.classList.add("v3");
			break;
		case 4:
			id.classList.add("v4");
			break;
		case 5:
			id.classList.add("v5");
			break;
		case 6:
			id.classList.add("v6");
			break;
		case 7:
			id.classList.add("v7");
			break;
		case 8:
			id.classList.add("v8");
			break;
	}
}

// 클릭한 곳이 비어있을 때, 게임처럼 비어있는 곳을 들춰내는 함수
function nullExpansion(x,y) {
	for (var i = -1; i <= 1; i++) {
		for (var j = -1; j <= 1; j++) {
			if (md2.indexValueValid((x + i), (y + j))) {
				if (md2.map[x+i][y+j] != -2) {
					var posX = x+i, posY = y+j;
					
					var id = "c" + fitToNumUnit(posX, 2) + fitToNumUnit(posY, 2);
					var cell = document.getElementById(id);
					var value = md2.map[posX][posY];

					if (value > 0) {
						cell.innerHTML = '' + value;
						showNumber(cell, value);
						md2.map[posX][posY] = -2;
					}
					else {
						md2.map[posX][posY] = -2;
						nullExpansion(posX,posY);
					}
					
					cell.style.backgroundColor = 'white';
					cell.disabled = true;
				}
			}
		}
	}
}

// 어랍쇼? 지뢰를 건드렸군요!
function touchMine(x,y) {
	var id = "c" + fitToNumUnit(x, 2) + fitToNumUnit(y, 2);
	var cell = document.getElementById(id);
	
	cell.style.backgroundColor = "red";
	
	bombMine();
	
	setTimeout(function() {
		showGameOver();
	}, 3000);
}

// 지뢰가 터진다!!! 콰과광!!!
function bombMine() {
	var width = md2.attr.width, height = md2.attr.height;
	for (var i = 0; i < width; i++) {
		for (var j = 0; j < height; j++) {
			if (md2.map[i][j] == -1) {
				bomb(i,j);
			}
		}
	}
}

// 터짐
function bomb(x,y) {
	var id = "c" + fitToNumUnit(x, 2) + fitToNumUnit(y, 2);
	var cell = document.getElementById(id);
	
	cell.style.backgroundColor = "yellow";
	
	setTimeout(function() {
		cell.style.backgroundColor = "red";
	},1000);
}

// 게임오버 창에 결과 현황을 보여준다.
function showResult() {
	var code = 0 + pointWin;	// 승패여부 코드 : false면 0, true면 1
	var result = setResultStorage(code);	// 승패여부를 저장하면서 값을 반환 받는다.
	
	var print = '승: '+result.win+', 패: '+result.lose+', 총합: '+result.total+'';
	
	document.getElementById('score_winlose').innerHTML = print;
}

// 기록을 로컬 스토리지에 저장하면서 기록을 리턴한다.
function setResultStorage(code) {
	var result = {win: 0, lose: 0, total: 0};
	
	if (localStorage.getItem('total') != undefined){
		result = getStorage();
	}
	
	switch(code) {
		case 0:
			result.lose++;
			break;
		case 1:
			result.win++;
			break;
	}
	result.total++;
	
	setStorage(result);
	
	return result;
}

function getStorage() {
	var total = localStorage.getItem('total');
	var win = localStorage.getItem('win');
	var lose = localStorage.getItem('lose');
	return {win: win, lose: lose, total: total};
}

function setStorage(v) {
	localStorage.setItem('win', v.win);
	localStorage.setItem('lose', v.lose);
	localStorage.setItem('total', v.total);
}

