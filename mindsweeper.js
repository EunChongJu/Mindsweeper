/* 
 * MindSweeper Game Framework
 * 
 * 1. 먼저 맵을 생성한다.
 * 2. 맵 안에 무작위로 지뢰를 놓는다. (이때 겹치면 안됨) <=
 * 3. 그리고 지뢰를 놓을 때마다 주변 값을 하나씩 올린다. (이때 지뢰가 있는 구역은 건드리지 않는다) <=
 * 4. 그리고 게임을 시작한다. (무한반복, 지뢰 터지기 전까지)
 * 5. 게임 끝
 * 
 */




// Library Functions

//2차원 배열을 w X h 만큼 생성한다. (실질적으로 0에서 w값까지가 아닌 w-1의 값까지다)
function makeUpTwiceArray(w, h) {
	var arr = new Array(w);
	
	for (var i = 0; i < w; i++) {
		arr[i] = new Array(h);
	}
	
	return arr;
}

//모든걸 0으로 만들어 드립니다 (2차원 배열 또는 테이블 한정)
function allMakeUpZero(map) {
	var size = analysisMap(map);
	for (var i = 0; i < size.width; i++) {
		for (var j = 0; j < size.height; j++) {
			map[i][j] = 0;
		}
	}
	return map;
}

//맵의 줄과 칸의 수를 오브젝트 형식으로 반환
function analysisMap(map) {
	return ({width: map.length, height: map[0].length});
}

// for Node; 입력 받기 위함 (커맨드는 쓸모없...)
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})


// Function

//레벨 선택
function selectLevel() {
	var w = 8, h = 6, n = 4;	// 각각 너비, 높이, 갯수: 만들때 0에서 9 미만까지 하니깐 그대로 입력해도 됨
	console.log("난이도를 선택하세요.");
	
	/*
	readline.question("(Easy: 1, Midium: 2, Expert: 3)", (level) => {
		if (level == 1) {
			console.log('Level: 1');
			w = 9;
			h = 9;
			n = 10;	//9x9칸의 10개의 지뢰
		}
		else if (level == 2) {
			console.log('Level: 2');
			w = 16;
			h = 16;
			n = 40;
		}
		else if (level == 3) {
			console.log('Level: 3');
			w = 30;
			h = 16;
			n = 99;
		}
		else {
			console.log('Level: ???');
			w = 100;
			h = 100;
			n = 99999;
		}
	});
	*/
	return ({height: w, width: h, num: n});
}

//맵을 세팅한다. (2차원 배열을 만든다 -> 레벨을 선택한다 -> 지뢰를 무작위로 배치한다 -> 지뢰 주변을 +1씩 올린다)
function makeUpMap(value) {
	console.log(value);
	
	var map = makeUpTwiceArray(value.width, value.height);
	
	map = perimeterMind(landMindLayout(allMakeUpZero(map), value.num));
	
	return map;
}

//지뢰를 배치하는 일을 반복하는 함수
function landMindLayout(map, num) {
	let count = 0;	//num에 도달할 때까지 반복
	
	while (count < num) {
		const set = landMind(analysisMap(map));
		
		if (atMindOrOutside(map[set.width][set.height])){
			map[set.width][set.height] = -1;
			//지뢰를 찾는다; 찾으면 true, 아니면 false
			console.log(count + ": [" + set.width + "," + set.height + "]");
			
			count++;
		}
	}
	console.log("지뢰 배치 완료!");
	return map;
}

//지뢰 배치를 추천해주는 함수; 지뢰가 이미 배치되었다면 다시 호출된다. (추천은 무슨 그냥 랜덤이잖아;;)
function landMind(size) {
	const w = Math.floor(Math.random() * size.width);
	const h = Math.floor(Math.random() * size.height);
	
	return ({width: w, height: h});
}

//지뢰를 탐색한다. 지뢰가 있다면 그곳의 주변 값을 +1 올리게 한다. 단, 지뢰는 안됨
function perimeterMind(map) {
	var size = analysisMap(map);
	var list = new Array();
	
	for (var i = 0; i < size.width; i++) {
		for (var j = 0; j < size.height; j++) {
			if (!atMindOrOutside(map[i][j])) {
				list.push({width: i, height: j});
			}
		}
	}
	
	console.dir(list);
	
	map = perimeterSetMind(map, size, list);
	
	return map;
}

//지뢰의 위치를 받은 값으로 주변의 값을 하나씩 올려준다. 만약 여기에 지뢰가 있다면 넘어가도록 한다. (기술상 문제로 배열 인덱스 값이 -1이거나 사이즈를 초과하는 값일수가 없기 때문에 조건을 걸어놓음)
function perimeterSetMind(map, size, pos) {
	var c = 0;
	
	for (var i = 0; i < pos.length; i++) {
		var w = pos[i].width;
		var h = pos[i].height;
		
		if (atIndex(w-1, h-1, size)) {
//			console.log(map[w-1][h-1] + " / " + map[w][h]);
			(atMind(map[w-1][h-1])) ? c++ : map[w-1][h-1]++;	// 지뢰가 있다면 냅두고 없으면 1++
//			map[w-1][h-1]++;
		}
		
		if (atIndex(w-1, h, size)) {
//			console.log(map[w-1][h] + " / " + map[w][h]);
			(atMind(map[w-1][h])) ? c++ : map[w-1][h]++;
//			map[w-1][h]++;
		}
		
		if (atIndex(w-1, h+1, size)) {
//			console.log(map[w-1][h+1] + " / " + map[w][h]);
			(atMind(map[w-1][h+1])) ? c++ : map[w-1][h+1]++;
//			map[w-1][h+1]++;
		}
		
		if (atIndex(w, h-1, size)) {
//			console.log(map[w][h-1] + " / " + map[w][h]);
			(atMind(map[w][h-1])) ? c++ : map[w][h-1]++;
//			map[w][h-1]++;
		}
		
		if (atIndex(w, h+1, size)) {
//			console.log(map[w][h+1] + " / " + map[w][h]);
			(atMind(map[w][h+1])) ? c++ : map[w][h+1]++;
//			map[w][h+1]++;
		}
		
		if (atIndex(w+1, h-1, size)) {
//			console.log(map[w+1][h-1] + " / " + map[w][h]);
			(atMind(map[w+1][h-1])) ? c++ : map[w+1][h-1]++;
//			map[w+1][h-1]++;
		}
		
		if (atIndex(w+1, h, size)) {
//			console.log(map[w+1][h-1] + " / " + map[w][h]);
			(atMind(map[w+1][h])) ? c++ : map[w+1][h]++;
//			map[w+1][h]++;
		}
		
		if (atIndex(w+1, h+1, size)) {
//			console.log(map[w+1][h+1] + " / " + map[w][h]);
			(atMind(map[w+1][h+1])) ? c++ : map[w+1][h+1]++;
//			map[w+1][h+1]++;
		}
	}
	
	return map;
}

//지뢰가 있거나 (undefine)이면 false를 반환, 지뢰가 없는 값이면 true를 반환.
function atMindOrOutside(at) {
	return (!(at == -1 || at == undefined));	// 지뢰가 있거나 비어있다면 false (앞에 !가 있다)
}

//인덱스 값 유효 확인
function atIndex(w, h, size) {
	return ((w < 0 || h < 0) || (w >= size.width || h >= size.height)) ? false : true;
}
//지뢰 확인
function atMind(at) {
	return at == -1;	// -1이 맞다면 true, 아니면 false
}

// 지뢰 지도의 현황을 보여준다
function showMap(map) {
	var size = analysisMap(map);
	
	console.log("맵 보여주기 시작");
	
	for (var i = 0; i < size.width; i++) {
		for (var j = 0; j < size.height; j++) {
//			console.log(" " + map[i][j] + "");
			process.stdout.write(' ' + showIcon(map[i][j]));
//			process.stdout.write("[" + i + "," + j + "] : " + map[i][j] + "\n");
		}
		console.log("\n");
	}
	console.log("맵 보여주기 끝");
	return;
}

//지뢰 배치 or 숫자 보여줌
function showIcon(mind) {
	return ((mind == -1) ? '$' : mind+'');
}

//메인함수 (맵을 세팅한다 -> 맵을 보여준다 -> 게임 시작)
function main() {
	//맵 세팅
	var map = makeUpMap(selectLevel());
	
	//맵 보여주기 (사실상 이거 쓰면 노잼이라 주석 처리 필요)
	showMap(map);
	
	//게임 시작
	start(map);
}

//게임 시작 함수
function MindGame(map) {
	this.map = map;
	let count = 0;
	let 
	
	
	
}


// TEST
console.log("지뢰찾기 게임 시작하시지... 후후후");
main();
console.log("GAME OVER");

